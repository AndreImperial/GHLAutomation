# GHL Workflow Specification: Bloom Dental Studio

## 1. Prerequisites

Before workflow build:

- Pipeline created
- Calendar created
- Form created
- Email templates created
- SMS snippets created
- SMS consent checkbox added
- Sending email domain configured
- STOP opt-out handling confirmed

## 2. Pipeline

Pipeline:

Free Consultation Funnel

Stages:

- New Lead
- Booked Consultation
- Consultation Complete
- Whitening Booked
- Whitening Paid
- Lost

## 3. Workflow: New Lead To Booking

Workflow name:

BD - New Lead To Booking

Trigger:

Form Submitted = Bloom Dental - New Patient Inquiry

Actions:

1. Add tag `bd-new-lead`.
2. Create/update opportunity in Free Consultation Funnel -> New Lead.
3. Save service interest custom field.
4. If SMS consent checked, add tag `bd-sms-opt-in`.
5. Send booking-link email.
6. If SMS consent checked, send booking-link SMS.
7. Wait 24 hours.
8. If Appointment Status is not Booked, send reminder email.

Stop condition:

Appointment booked.

## 4. Workflow: Consultation Booking Flow

Workflow name:

BD - Consultation Booking Flow

Trigger:

Appointment Status = Booked

Filter:

Calendar = Bloom Dental - Free Consultation

Actions:

1. Add tag `bd-consult-booked`.
2. Move opportunity to Booked Consultation.
3. Send SMS: BD SMS - Booking Confirm.
4. Send email: BD Email - Booking Confirmation.
5. Wait until 24 hours before appointment.
6. Send email: BD Email - 24hr Reminder.
7. Wait until 2 hours before appointment.
8. If contact has tag `bd-sms-opt-in`, send SMS: BD SMS - 2hr Reminder.
9. Wait until 1 hour after appointment start.
10. If Appointment Status = Completed, start Post-Consultation Upsell.
11. If Appointment Status = No-Show, start No-Show Recovery.

## 5. Workflow: No-Show Recovery

Workflow name:

BD - No-Show Recovery

Trigger:

Appointment Status = No-Show

Actions:

1. Add tag `bd-no-show`.
2. Send SMS: BD SMS - No-Show Follow-Up.
3. Wait 24 hours.
4. If no appointment booked, send email: BD Email - No-Show Rebook.
5. Wait 72 hours.
6. If no appointment booked, send final SMS with booking link.
7. If still no appointment, move opportunity to Lost.

Stop condition:

Appointment booked.

## 6. Workflow: Post-Consultation Upsell

Workflow name:

BD - Post Consultation Whitening Upsell

Trigger:

Appointment Status = Completed

Actions:

1. Add tag `bd-consult-complete`.
2. Move opportunity to Consultation Complete.
3. Send email: BD Email - Post Consult Whitening Offer.
4. Wait 2 days.
5. If whitening not booked and SMS consent exists, send SMS: BD SMS - Whitening Reminder.
6. Wait 3 days.
7. If whitening not booked, send email: BD Email - Whitening Final Follow-Up.
8. If whitening booked, move opportunity to Whitening Booked and add tag `bd-whitening-booked`.

Stop condition:

Whitening booked.

## 7. Workflow: Whitening Paid

Workflow name:

BD - Whitening Payment Update

Trigger:

Manual stage update or payment received.

Actions:

1. Move opportunity to Whitening Paid.
2. Add tag `bd-whitening-paid`.
3. Start retention/recall timer.

## 8. Workflow: Six-Month Recall

Workflow name:

BD - Six Month Cleaning Recall

Trigger:

Consultation completed, whitening paid, or cleaning completed.

Actions:

1. Wait 6 months.
2. Add tag `bd-recall-due`.
3. Send cleaning recall email.
4. If SMS consent exists, send cleaning recall SMS.
5. If booked, create or update opportunity.

## 9. Workflow QA Rules

Before publishing:

- Confirm every email template exists.
- Confirm every SMS snippet exists.
- Confirm SMS only sends to opted-in contacts.
- Confirm appointment completed branch does not trigger no-show.
- Confirm no-show branch does not trigger for completed appointments.
- Confirm all stage moves use the correct pipeline.
- Confirm test contact activity appears in dashboard.

