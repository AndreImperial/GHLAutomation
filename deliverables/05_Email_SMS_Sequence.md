# Email and SMS Sequence: Bloom Dental Studio

## Sequence Overview

This sequence supports the consultation booking journey, no-show recovery, and post-consultation whitening upsell.

## SMS 1 - Booking Confirmation

Name:

BD SMS - Booking Confirm

Trigger:

Appointment booked.

Body:

Hi {{contact.first_name}}, your Bloom Dental consultation is booked for {{appointment.start_time}}. Reply STOP to opt out.

## Email 1 - Booking Confirmation

Name:

BD Email - Booking Confirmation

Subject:

Your Bloom Dental consultation is booked

Body:

Hi {{contact.first_name}},

Your free 30-minute consultation with Bloom Dental Studio is confirmed for {{appointment.start_time}}.

During the visit, we will talk through your smile goals, answer your questions, and explain whether whitening, veneers, Invisalign, or another option makes sense for you.

If you need to reschedule, use this link:

{{appointment.reschedule_link}}

See you soon,

Bloom Dental Studio

## Email 2 - 24-Hour Reminder

Name:

BD Email - 24hr Reminder

Subject:

Reminder: your Bloom Dental consultation is tomorrow

Body:

Hi {{contact.first_name}},

Quick reminder that your free Bloom Dental consultation is scheduled for {{appointment.start_time}}.

Please arrive a few minutes early so we can start on time. If your plans changed, you can reschedule here:

{{appointment.reschedule_link}}

See you soon,

Bloom Dental Studio

## SMS 2 - 2-Hour Reminder

Name:

BD SMS - 2hr Reminder

Trigger:

2 hours before appointment.

Body:

Hi {{contact.first_name}}, reminder: your Bloom Dental consultation is in 2 hours at BGC. Reply STOP to opt out.

## SMS 3 - No-Show Follow-Up

Name:

BD SMS - No-Show Follow-Up

Trigger:

Appointment marked no-show.

Body:

Hi {{contact.first_name}}, sorry we missed you today. You can rebook your free Bloom Dental consultation here: {{calendar.link}}

## Email 3 - No-Show Recovery

Name:

BD Email - No-Show Rebook

Subject:

Want to reschedule your free Bloom Dental consultation?

Body:

Hi {{contact.first_name}},

Sorry we missed you today. If you still want to understand your whitening or smile options, you can book another free 30-minute consultation here:

{{calendar.link}}

There is no pressure and no charge for the consultation.

Bloom Dental Studio

## Email 4 - Post-Consultation Whitening Offer

Name:

BD Email - Post Consult Whitening Offer

Subject:

Your whitening next step

Body:

Hi {{contact.first_name}},

Thank you for visiting Bloom Dental Studio.

If you are ready to move forward with Premium In-Chair Whitening, you can book your whitening appointment here:

{{calendar.link}}

The session is PHP 15,000 and is designed for patients who want a visibly brighter smile with professional guidance.

Bloom Dental Studio

## SMS 4 - Whitening Reminder

Name:

BD SMS - Whitening Reminder

Trigger:

2 days after completed consultation, if whitening not booked.

Body:

Hi {{contact.first_name}}, ready to book your Bloom Dental whitening session? You can choose a time here: {{calendar.link}}

## Email 5 - Final Whitening Follow-Up

Name:

BD Email - Whitening Final Follow-Up

Subject:

Still considering whitening?

Body:

Hi {{contact.first_name}},

Just checking in after your consultation at Bloom Dental Studio.

If Premium In-Chair Whitening still feels like the right next step, you can book your session here:

{{calendar.link}}

If you have questions before booking, reply to this email and the team can help.

Bloom Dental Studio

