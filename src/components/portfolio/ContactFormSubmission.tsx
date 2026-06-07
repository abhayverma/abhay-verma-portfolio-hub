import React from "react";

export default function ContactFormSubmission() {
  return (
    <form
      action="https://formsubmit.co/social.abhay@gmail.com" // replace with your email
      method="POST"
      className="space-y-4 max-w-xl"
      target="_blank" // opens submission result in a new tab so SPA doesn't navigate away
    >
      {/* Honeypot */}
      <input type="text" name="_honey" style={{ display: "none" }} />

      {/* Disable FormSubmit's captcha if you don't want it */}
      <input type="hidden" name="_captcha" value="false" />

      {/* Optional redirect after submit */}
      {/* <input type="hidden" name="_next" value="https://abhayverma.com/thanks" /> */}

      <input name="name" placeholder="Name" required className="w-full" />
      <input name="email" type="email" placeholder="Email" required className="w-full" />
      <input name="company" placeholder="Company" className="w-full" />
      <input name="project" placeholder="Project" className="w-full" />
      <input name="budget" placeholder="Budget" className="w-full" />
      <input name="timeline" placeholder="Timeline" className="w-full" />
      <textarea name="message" placeholder="Message" rows={5} className="w-full" required />

      <div className="flex gap-3">
        <button type="submit" className="btn-primary">Start a Conversation</button>
        <button type="reset" className="btn-ghost">Reset</button>
      </div>
    </form>
  );
}
