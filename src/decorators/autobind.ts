namespace App {
  //auto bind decorator
  export function autoBind(
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
}
