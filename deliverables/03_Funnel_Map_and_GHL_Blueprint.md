# Funnel Map and GHL Automation Blueprint: Bloom Dental Studio

## 1. Funnel Type

Lead generation funnel with appointment-booking conversion and post-consultation upsell.

## 2. Funnel Path

Meta ad -> GHL landing page -> New Patient Inquiry form -> calendar booking -> confirmation/reminders -> consultation -> whitening upsell -> recall

## 3. Pipeline

Pipeline name:

Free Consultation Funnel

Stages:

1. New Lead
2. Booked Consultation
3. Consultation Complete
4. Whitening Booked
5. Whitening Paid
6. Lost

## 4. Forms

Form name:

Bloom Dental - New Patient Inquiry

Fields:

- First name
- Last name
- Email
- Phone
- Main interest
- Preferred appointment date
- SMS consent checkbox

Main interest options:

- Whitening
- Veneers
- Invisalign
- General consultation
- Not sure yet

SMS consent:

I agree to receive appointment reminders and follow-up messages from Bloom Dental Studio. I understand I can reply STOP to opt out.

## 5. Calendar

Calendar name:

Bloom Dental - Free Consultation

Settings:

- Duration: 30 minutes
- Buffer before: 10 minutes
- Buffer after: 10 minutes
- Available days: Monday to Saturday
- Available hours: 9:00 AM to 5:00 PM
- Minimum scheduling notice: 2 hours
- Timezone: Asia/Manila

## 6. Tags

- `bd-new-lead`
- `bd-consult-booked`
- `bd-consult-complete`
- `bd-no-show`
- `bd-whitening-interest`
- `bd-whitening-booked`
- `bd-whitening-paid`
- `bd-lost`
- `bd-sms-opt-in`
- `bd-recall-due`

## 7. Custom Fields

- Service interest
- Preferred appointment date
- SMS consent
- Consultation outcome
- Whitening interest
- Lead source
- Last appointment date
- Recall due date

## 8. Workflow A - New Lead To Booking

Trigger:

Form submitted: Bloom Dental - New Patient Inquiry

Actions:

1. Add tag `bd-new-lead`.
2. Add or update opportunity in `New Lead`.
3. If service interest = Whitening, add tag `bd-whitening-interest`.
4. Send email with booking link.
5. If SMS consent is true, send SMS with booking link.
6. Wait 24 hours.
7. If no appointment is booked, send reminder to book.

## 9. Workflow B - Appointment Show-Up

Trigger:

Appointment Status = Booked

Filter:

Calendar = Bloom Dental - Free Consultation

Actions:

1. Add tag `bd-consult-booked`.
2. Move opportunity to `Booked Consultation`.
3. Send booking confirmation SMS.
4. Send booking confirmation email.
5. Wait until 24 hours before appointment.
6. Send 24-hour reminder email.
7. Wait until 2 hours before appointment.
8. Send 2-hour reminder SMS.
9. Wait until after appointment time.
10. Check appointment status.

If completed:

- Move opportunity to `Consultation Complete`.
- Add tag `bd-consult-complete`.
- Start Workflow D - Post-Consultation Upsell.

If no-show:

- Add tag `bd-no-show`.
- Move opportunity to `Lost` or no-show substage if available.
- Start Workflow C - No-Show Recovery.

## 10. Workflow C - No-Show Recovery

Trigger:

Appointment Status = No-Show

Actions:

1. Send SMS: friendly rebook prompt.
2. Wait 24 hours.
3. If no new booking, send email with rebooking link.
4. Wait 72 hours.
5. If still no booking, send final SMS reminder.
6. If no action, tag as `bd-lost`.

## 11. Workflow D - Post-Consultation Whitening Upsell

Trigger:

Appointment Status = Completed

Actions:

1. Move opportunity to `Consultation Complete`.
2. Send same-day whitening follow-up email.
3. Wait 2 days.
4. If SMS consent is true, send whitening reminder SMS.
5. Wait 3 days.
6. Send final whitening follow-up email.
7. If whitening appointment is booked, move to `Whitening Booked`.

## 12. Workflow E - Retention And Recall

Trigger:

Consultation complete or cleaning complete.

Actions:

1. Wait 6 months.
2. Add tag `bd-recall-due`.
3. Send cleaning/check-up reminder email.
4. Send SMS reminder if consent is true.
5. If booked, update opportunity or create recall opportunity.

