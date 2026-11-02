# Booking-path demo

Source for the Overview's booking-path illustration (`assets/demo/`). It is built with the Stageshow skill's React kit and rendered to video, so the site itself ships no React.

The story matches the verification ledger: a test booking, the contact moving to Booked Consultation with its tag, and the confirmation email going from Queued to Delivery failed. Keep it that way if you edit it.

## Re-render

1. Copy `index.tsx` and `booking.css` to the Stageshow skill as `examples/bloom-booking/`, add a `fonts/` folder with the site's Instrument Serif, Manrope, and JetBrains Mono files, and copy `record.html` and `record.tsx` into its `playground/`.
2. In the skill folder: `npm install`, then `npm run dev` (serves http://127.0.0.1:5173).
3. Record one exact loop frame by frame on the virtual clock:
   `node record.js 720 frames-wide` and `node record.js 390 frames-compact` (needs Playwright).
4. Encode with Playwright's bundled ffmpeg (it reads an image stream, so concatenate the JPEGs first):
   `cat frames-wide/f*.jpg > wide.mjpeg && ffmpeg -f image2pipe -framerate 30 -c:v mjpeg -i wide.mjpeg -c:v libvpx -b:v 1800k -crf 6 -auto-alt-ref 0 -pix_fmt yuv420p booking-wide.webm`
5. Posters are frames from the payoff hold (the failed email and the note on screen).
