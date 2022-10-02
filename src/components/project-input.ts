/// <reference path="base-component.ts" />

namespace App {
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
      super('project-input', 'app', true, 'user-input')

      this.titleInputElement = this.element.querySelector(
        '#title'
      ) as HTMLInputElement
      this.descriptionInputElement = this.element.querySelector(
        '#description'
      ) as HTMLInputElement
      this.peopleInputElement = this.element.querySelector(
        '#people'
      ) as HTMLInputElement

      this.configure()
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler)
    }

    renderContent() {}

    private getherUserInput(): [string, string, number] | void {
      const enterdTitle = this.titleInputElement.value
      const enterdDescription = this.descriptionInputElement.value
      const enteredPeople = this.peopleInputElement.value

      const titleValidatable: Validatable = {
        value: enterdTitle,
        required: true,
      }
      const descriptionValidatable: Validatable = {
        value: enterdDescription,
        required: true,
        minLength: 5,
      }
      const peopleValidatable: Validatable = {
        value: enteredPeople,
        required: true,
        min: 1,
        max: 5,
      }

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Invalid input, please try again')
        return
      } else {
        return [enterdTitle, enterdDescription, +enteredPeople] // returns Tuple
      }
    }

    private clearInputs() {
      this.titleInputElement.value = ''
      this.descriptionInputElement.value = ''
      this.peopleInputElement.value = ''
    }

    @autoBind
    private submitHandler(event: Event) {
      event.preventDefault()
      const userInput = this.getherUserInput()
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput
        projectState?.addProject(title, desc, people)
        this.clearInputs()
      }
    }
  }
}
