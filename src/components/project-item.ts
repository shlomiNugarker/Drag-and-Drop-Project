import { Draggable } from '../models/drag-drop.js'
import { Project } from '../models/project.js'
import { Component } from './base-component.js'
import { autoBind } from '../decorators/autobind.js'

// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLinkElement>
  implements Draggable
{
  // <- generics: first= hostElement, second = element
  private project: Project

  get persons() {
    if (this.project.people === 1) return '1 person'
    return `${this.project.people} persons`
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id)
    this.project = project

    this.configure()
    this.renderContent()
  }

  @autoBind
  dragStartHandler(event: DragEvent): void {
    console.log(event)
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(_: DragEvent): void {
    console.log('dragEndHandler')
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }
}