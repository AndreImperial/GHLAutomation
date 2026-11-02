import { Badge, Bar, Collapse, Count, Fly, Icon, Phone, Spinner, Stage, States, Window, type Act, type Rect } from '../../kit'
import './booking.css'

// Bloom Dental, the tested booking path (a workshop simulation). A system
// story told as a device pair: a test patient books a consultation on the
// clinic's booking page (the phone), and the CRM pipeline (the window) shows
// what the build did with it. The contact moves from New Lead to Booked
// Consultation, its tag changes, and the confirmation email queues, then
// fails to deliver: the issue testing caught before launch. Every state shown
// matches the site's verification ledger; nothing claims a delivered message.
//
// Real strings: the pipeline name, the two column names, the contact, its tag,
// the time slots, the booking button, the email row and its status, and the
// annotation. Everything else is filler.
//
// Compact (phone column): the phone leads, and a single contact card straddles
// its foot. The card's stage rolls instead of the card flying between columns.

type Book = 'idle' | 'busy' | 'done'
type Mail = 'hidden' | 'queued' | 'failed'
type S = {
  slot: number | null
  book: Book
  lifted: boolean
  landed: boolean
  fly: null | { from: Rect; to: Rect; go: boolean }
  mail: Mail
  note: boolean
  dip: boolean
}

const START: S = { slot: null, book: 'idle', lifted: false, landed: false, fly: null, mail: 'hidden', note: false, dip: false }
const POSTER: S = { ...START, slot: 2, book: 'done', lifted: true, landed: true, mail: 'failed', note: true }

const SLOTS = ['9:30', '10:00', '10:30', '11:00']
const PICK = 2
const REST = { wide: { x: 690, y: 380 }, compact: { x: 330, y: 300 } }

async function script(a: Act<S>) {
  await a.wait(1100)
  a.mark('pick')
  await a.click(`slot-${PICK}`)
  a.put({ slot: PICK })
  await a.wait(650)
  a.mark('book')
  await a.click('book')
  a.put({ book: 'busy' })
  await a.wait(700)
  a.put({ book: 'done' })
  await a.wait(350)

  if (a.layout === 'wide') {
    // The contact leaves New Lead and lands at the top of Booked Consultation.
    const from = a.rect('card-src', { layout: true })
    const col = a.rect('booked-list', { layout: true })
    const to = { x: col.x, y: col.y, width: from.width, height: from.height }
    // The flyer is held over the card first, then the card hides as it departs
    await a.set({ fly: { from, to, go: false } })
    await a.wait(120)
    await a.set((s) => ({ lifted: true, fly: { ...s.fly!, go: true } }))
    await a.wait(950)
    await a.set({ fly: null, landed: true })
  } else {
    await a.set({ lifted: true, landed: true })
  }
  a.move(REST[a.layout])
  await a.wait(700)

  a.mark('mail')
  await a.set({ mail: 'queued' })
  await a.wait(1700)
  a.mark('failed')
  await a.set({ mail: 'failed' })
  await a.wait(500)
  await a.set({ note: true })
  await a.wait(2600)

  // The loop dips to the page and comes back on the opening frame
  await a.set({ dip: true })
  await a.wait(450)
  await a.snap({ ...START, dip: true })
  await a.wait(150)
  await a.set({ dip: false })
  await a.wait(400)
}

function Tag({ booked }: { booked: boolean }) {
  return (
    <States
      className="bk-tagSlot"
      value={booked ? 'booked' : 'lead'}
      align="start"
      states={{ lead: <span className="bk-tag">bd-new-lead</span>, booked: <span className="bk-tag">bd-consult-booked</span> }}
    />
  )
}

function ContactCard({ booked, target, hidden }: { booked: boolean; target?: string; hidden?: boolean }) {
  return (
    <div className="bk-card bk-card--real" data-target={target} data-hidden={hidden || undefined}>
      <span className="bk-card__name">Test contact</span>
      <Tag booked={booked} />
    </div>
  )
}

function Filler({ w }: { w: number }) {
  return (
    <div className="bk-card">
      <Bar w={w} h={6} tone={3} />
      <Bar w={Math.round(w * 0.6)} h={5} tone={2} />
    </div>
  )
}

function MailRow({ s, short }: { s: S; short?: boolean }) {
  return (
    <Collapse open={s.mail !== 'hidden'} reveal="drop">
      <div className="bk-mail">
        <span className="bk-mail__icon">
          <Icon name="mail" size={14} filled />
        </span>
        <span className="bk-mail__label">{short ? 'Confirmation email' : 'Booking confirmation email'}</span>
        <span className="bk-mail__status">
          <States
            value={s.mail === 'failed' ? 'failed' : 'queued'}
            align="end"
            states={{
              queued: (
                <Badge tone="neutral" icon={<Spinner size={12} />}>
                  Queued
                </Badge>
              ),
              failed: <Badge tone="danger">Delivery failed</Badge>,
            }}
          />
        </span>
      </div>
      <div className="bk-note" data-on={s.note || undefined}>
        Caught in testing, before launch
      </div>
    </Collapse>
  )
}

function BookingScreen({ s }: { s: S }) {
  return (
    <div className="bk-app">
      <div className="bk-app__eyebrow">Bloom Dental Studio</div>
      <div className="bk-app__title">Choose a time</div>
      <div className="bk-app__sub">Free 30-minute consultation</div>
      <div className="bk-day">
        <Bar w={34} h={8} tone={3} />
        <span className="bk-day__on">Tue 21</span>
        <Bar w={34} h={8} tone={3} />
      </div>
      <div className="bk-slots">
        {SLOTS.map((t, i) => (
          <span key={t} className="bk-slot" data-target={`slot-${i}`} data-on={s.slot === i || undefined}>
            {t}
          </span>
        ))}
      </div>
      <div className="bk-book" data-target="book" data-state={s.book}>
        <States
          value={s.book}
          states={{
            idle: 'Book consultation',
            busy: <Spinner size={18} />,
            done: (
              <span className="bk-book__done">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3.5 8.5 6.5 11.5 12.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Booked
              </span>
            ),
          }}
        />
      </div>
      <div className="bk-app__fine">
        {[200, 168, 184].map((w, i) => (
          <div key={i} className="bk-app__fineRow">
            <span className="bk-app__dot" />
            <Bar w={w} h={8} tone={3} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BloomBooking() {
  return (
    <Stage<S>
      width={720}
      height={420}
      compact={{ below: 600, width: 358, height: 476 }}
      theme="dark"
      initial={START}
      poster={POSTER}
      script={script}
      cursor={{ at: REST, style: 'touch' }}
      className="bk"
    >
      {(s, _rect, layout) => {
        const compact = layout === 'compact'
        return (
          <>
            {!compact && (
              <Window title="Free Consultation Funnel" className="bk-window">
                <div className="bk-board">
                  <section className="bk-col">
                    <header className="bk-col__head">
                      New Lead <Count className="bk-count" value={s.lifted ? 2 : 3} duration={500} />
                    </header>
                    <div className="bk-list">
                      <Collapse open={!s.lifted}>
                        <div className="bk-card-wrap">
                          <ContactCard booked={false} target="card-src" hidden={s.lifted} />
                        </div>
                      </Collapse>
                      <Filler w={92} />
                      <Filler w={74} />
                    </div>
                  </section>
                  <section className="bk-col">
                    <header className="bk-col__head">
                      Booked Consultation <Count className="bk-count" value={s.landed ? 2 : 1} duration={500} />
                    </header>
                    <div className="bk-list" data-target="booked-list">
                      <Collapse open={s.lifted || s.landed}>
                        <div className="bk-card-wrap">
                          <ContactCard booked={s.landed} hidden={!s.landed} />
                        </div>
                      </Collapse>
                      <Filler w={80} />
                    </div>
                  </section>
                  <section className="bk-col bk-col--behind">
                    <header className="bk-col__head">
                      <Bar w={96} h={6} tone={3} />
                    </header>
                    <div className="bk-list">
                      <Filler w={70} />
                    </div>
                  </section>
                </div>
                <div className="bk-activity">
                  <div className="bk-activity__head">Activity</div>
                  <MailRow s={s} />
                  <div className="bk-past">
                    <span className="bk-mail__icon" />
                    <Bar w={150} h={6} tone={3} />
                    <Bar w={44} h={6} tone={2} style={{ marginLeft: 'auto' }} />
                  </div>
                </div>
              </Window>
            )}

            {compact && (
              <div className="bk-contact">
                <div className="bk-contact__head">
                  <span className="bk-card__name">Test contact</span>
                  <States
                    value={s.landed ? 'booked' : 'lead'}
                    align="end"
                    states={{ lead: <span className="bk-stage">New Lead</span>, booked: <span className="bk-stage">Booked Consultation</span> }}
                  />
                </div>
                <Tag booked={s.landed} />
                <MailRow s={s} short />
              </div>
            )}

            <Phone width={compact ? 250 : 236} frame="pro" className="bk-phone">
              <BookingScreen s={s} />
            </Phone>

            {s.fly && (
              <Fly from={s.fly.from} to={s.fly.to} go={s.fly.go} held duration={900}>
                <div className="bk-card bk-card--real bk-card--flying">
                  <span className="bk-card__name">Test contact</span>
                  <Tag booked={false} />
                </div>
              </Fly>
            )}

            <div className="bk-dip" data-on={s.dip || undefined} />
          </>
        )
      }}
    </Stage>
  )
}
