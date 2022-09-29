//auto bind decorator
function autoBind(
  _: any, // target/constructor   "_" gives a hint to typescript not to use it
  _2: string, // methodName
  descriptor: PropertyDescriptor // אובייקט שמתאר פרופרטי מסויים ואיך אפשר לעבוד איתו
) {
  const originalMethod = descriptor.value
  const adjDescirptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    },
  }
  return adjDescirptor
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement

    this.hostElement = <HTMLDivElement>document.getElementById('app')!

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement
    this.element.id = 'user-input'

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
    this.attach()
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault()
    console.log(this.titleInputElement.value)
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput()
