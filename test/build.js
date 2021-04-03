import path from 'path';
import { execSync } from 'child_process';

function build_run(file) {
  const basename = path.basename(file).split('.')[0]

  const intermedietFile = `build/${basename}.j`
  execSync(`node . ${file} > ${intermedietFile}`)
  execSync(`java -jar bin/jasmin.jar ${intermedietFile} -d build`)
  return execSync(`java -cp build/ ${basename}`, { encoding: 'utf-8' }).split('\n')
}

export default build_run
