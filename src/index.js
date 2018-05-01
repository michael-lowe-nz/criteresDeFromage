import './index.scss'

console.log('Griswald Glumboonie')

function waitALittle() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  })
}

async function main () {
  await waitALittle()
  console.log('Finito')
}

main()