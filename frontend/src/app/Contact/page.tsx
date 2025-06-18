import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'
import { Phone, Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const page = () => {
  return (
    // CONTACT
    <div className="flex flex-col md:flex-row h-[700px] gap-7 p-4 font-inter relative mt-24 ">
      {/* Left container: Info + Accordion */}
      <div className="bg-white shadow-md p-6 md:w-1/2 rounded-md">
        <div className="text-2xl text-color2 mb-4">
          <p className="text-color2 text-shadow">
            You can email us anytime with your questions. We’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="shadow-md rounded-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-2 text-color3">
            <div className="flex items-center gap-2">
              <Mail className="text-black" />
              <p>batucall3@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone />
              <h2>+44 7123 456 7891</h2>
            </div>
          </div>
          <p className="text-color2 text-xs">
            <span className="text-color3 text-shadow font-semibold">Working Hours:</span> Monday–Friday, 09:00 AM – 06:00 PM (GMT+3)
          </p>
        </div>

        <div className="text-base sm:text-lg text-color3 text-shadow mb-6">
          123 Main Street, Suite 400<br />
          New York, NY 10001<br />
          United States
        </div>

        {/* ACCORDION */}
        <div className="shadow-md p-4 background-image-accordion rounded-md mt-24">
          <p className="flex justify-center text-color2 text-md text-shadow mb-4 font-semibold">
            Appointment and Viewing Questions
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer text-color2 text-lg hover:no-underline">
                When can I view the property?
              </AccordionTrigger>
              <AccordionContent className="text-md text-shadow text-color3">
                You can schedule a viewing on weekdays between 10:00 AM and 6:00 PM. Please contact us in advance to set an appointment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="cursor-pointer text-color2 text-lg hover:no-underline">
                Is it possible to visit the property on the weekend?
              </AccordionTrigger>
              <AccordionContent className="text-md text-shadow text-color3">
                Yes, weekend viewings are available by appointment only. We recommend booking at least 1–2 days in advance, especially for Saturdays.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="cursor-pointer text-color2 text-lg hover:no-underline">
                Is it listed by the owner or through an agent?
              </AccordionTrigger>
              <AccordionContent className="text-md text-shadow text-color3">
                This property is listed through a professional real estate agent who will assist you during the viewing and rental process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Right container: Form + Map */}
      <div className="md:w-1/2 flex flex-col gap-6">
        {/* Form */}
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="firstname" className="text-md mb-1">First Name</Label>
              <Input type="text" id="firstname" placeholder="Enter your first name" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="lastname" className="text-md mb-1">Last Name</Label>
              <Input type="text" id="lastname" placeholder="Enter your last name" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email" className="text-md mb-1">Email</Label>
              <Input type="email" id="email" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="phone" className="text-md mb-1">Phone</Label>
              <Input type="tel" id="phone" placeholder="+1 234 567 8901" />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="message" className="text-md mb-1">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" rows={5} />
          </div>

          <div className="flex justify-end mt-6">
            <Button className="bg-primary text-white hover:bg-primary-dark shadow-lg cursor-pointer">
              Send Message
            </Button>
          </div>
        </div>

        {/* Map */}
        <div className="h-64 w-full rounded-md overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps?q=-33.8675,151.2070&z=14&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default page
