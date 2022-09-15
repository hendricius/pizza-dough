import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "message",
    "email",
    "contact_message",
    "contact_method",
    "company_name",
    "name",
    "phone",
  ]

  submit(event) {
    event.preventDefault()
    this.toggleModal()
    this.requestInfo(this.submitOptions())
    this.messageTarget.classList.remove("hidden")
    window.scrollTo(0,0)
  }

  submitOptions() {
    return {
      email: this.emailTarget.value,
      message: this.contact_messageTarget.value,
      contact_method: this.contact_methodTarget.value,
      company_name: this.company_nameTarget.value,
      name: this.nameTarget.value,
      phone: this.phoneTarget.value,
    }
  }

  async requestInfo(contactOptions) {
    const response = await fetch("/contact", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getMetaValue("csrf-token")
      },
      body: JSON.stringify(contactOptions)
    });
    return response.json()
  }

  toggleModal() {
    const modalId = "contact-modal";
    const backdrop = document.querySelectorAll('[modal-backdrop]')[0]
    document.getElementById(modalId).classList.toggle("hidden")
    backdrop.classList.toggle("hidden")
    document.getElementById(modalId).classList.toggle("flex")
    backdrop.classList.toggle("flex")
  }

  getMetaValue(name) {
    const element = document.head.querySelector(`meta[name="${name}"]`)
    return element.getAttribute("content")
  } 
}
