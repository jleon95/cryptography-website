import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.originalText.upsert({
    where: {
      id: 0
    },
    update: {
      content: 'Los retos actuales como sociedad, a corto y medio plazo, pasan por: cerrar la brecha de género, que se ha ampliado un veinticinco por ciento en la exclusión desde dosmil trece; integrar social y económicamente a los más jóvenes; insertar laboralmente a los adultos mayores; proteger a las familias más débiles, las numerosas y las monoparentales e integrar mejor a la población extranjera, afectada el cuarenta y siete por ciento por la exclusión social y el veintiseis por la exclusión severa. La organización considera que una coyuntura económica de "bonanza" constituye una oportunidad para generar apoyos a quienes se encuentran peor y pide para ellos prioridad en el marco de las políticas sociales del momento. Seis millones de personas viviendo al día En este estudio de final de ciclo (dosmil siete - dosmil diecisiete), el informe hace mención especial a aquellas personas en situación de integración precaria, que más que nunca tienden a concentrarse en la frontera con la exclusión moderada. Son el trece por ciento de la población, seis millones de personas, y se sitúan en el espacio de la integración en una posición de gran debilidad, "viviendo tan al día que un ligero empeoramiento en la situación socioeconómica haría que sus posibilidades de transitar a la exclusión sean muy elevadas", apuntan. Es un reflejo de la conocida precarización social." Cuando los medios de comunicación se refieren a la precarización de las clases medias, este grupo al que nos estamos refiriendo sería el protagonista en sentido estricto de esta afirmación", señala el informe. Sobre ellos, los expertos lanzan un aviso: "Este grupo considerable se encuentra en una situación tal que la probabilidad de que una próxima crisis les afecte rápidamente es elevada".'
    },
    create: {
      id: 0,
      content: 'Los retos actuales como sociedad, a corto y medio plazo, pasan por: cerrar la brecha de género, que se ha ampliado un veinticinco por ciento en la exclusión desde dosmil trece; integrar social y económicamente a los más jóvenes; insertar laboralmente a los adultos mayores; proteger a las familias más débiles, las numerosas y las monoparentales e integrar mejor a la población extranjera, afectada el cuarenta y siete por ciento por la exclusión social y el veintiseis por la exclusión severa. La organización considera que una coyuntura económica de "bonanza" constituye una oportunidad para generar apoyos a quienes se encuentran peor y pide para ellos prioridad en el marco de las políticas sociales del momento. Seis millones de personas viviendo al día En este estudio de final de ciclo (dosmil siete - dosmil diecisiete), el informe hace mención especial a aquellas personas en situación de integración precaria, que más que nunca tienden a concentrarse en la frontera con la exclusión moderada. Son el trece por ciento de la población, seis millones de personas, y se sitúan en el espacio de la integración en una posición de gran debilidad, "viviendo tan al día que un ligero empeoramiento en la situación socioeconómica haría que sus posibilidades de transitar a la exclusión sean muy elevadas", apuntan. Es un reflejo de la conocida precarización social." Cuando los medios de comunicación se refieren a la precarización de las clases medias, este grupo al que nos estamos refiriendo sería el protagonista en sentido estricto de esta afirmación", señala el informe. Sobre ellos, los expertos lanzan un aviso: "Este grupo considerable se encuentra en una situación tal que la probabilidad de que una próxima crisis les afecte rápidamente es elevada".'
    }
  });
  await prisma.originalText.upsert({
    where: {
      id: 1
    },
    update: {
      content: 'Cuando el pirata Francis Drake asaltó a Riohacha, en el siglo XVI, la bisabuela de Úrsula Iguarán se asustó tanto con el toque de rebato y el estampido de los cañones, que perdió el control de los nervios y se sentó en un fogón encendido. Las quemaduras la dejaron convertida en una esposa inútil para toda la vida. No podía sentarse sino de medio lado, acomodada en cojines, y algo extraño debió quedarle en el modo de andar, porque nunca volvió a caminar en público. Renunció a toda clase de hábitos sociales obsesionada por la idea de que su cuerpo despedía un olor a chamusquina. El alba la sorprendía en el patio sin atreverse a dormir, porque soñaba que los ingleses con sus feroces perros de asalto se metían por la ventana del dormitorio y la sometían a vergonzosos tormentos con hierros al rojo vivo. Su marido, un comerciante aragonés con quien tenía dos hijos, se gastó media tienda en medicinas y entretenimientos buscando la manera de aliviar sus terrores.'
    },
    create: {
      id: 1,
      content: 'Cuando el pirata Francis Drake asaltó a Riohacha, en el siglo XVI, la bisabuela de Úrsula Iguarán se asustó tanto con el toque de rebato y el estampido de los cañones, que perdió el control de los nervios y se sentó en un fogón encendido. Las quemaduras la dejaron convertida en una esposa inútil para toda la vida. No podía sentarse sino de medio lado, acomodada en cojines, y algo extraño debió quedarle en el modo de andar, porque nunca volvió a caminar en público. Renunció a toda clase de hábitos sociales obsesionada por la idea de que su cuerpo despedía un olor a chamusquina. El alba la sorprendía en el patio sin atreverse a dormir, porque soñaba que los ingleses con sus feroces perros de asalto se metían por la ventana del dormitorio y la sometían a vergonzosos tormentos con hierros al rojo vivo. Su marido, un comerciante aragonés con quien tenía dos hijos, se gastó media tienda en medicinas y entretenimientos buscando la manera de aliviar sus terrores.'
    }
  })
}
main()
  .then(async () => {
    console.log("Done seeding")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })