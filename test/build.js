import path from 'path';
import { execSync } from 'child_process';

function build_run(file) {
  const basename = path.basename(file).split('.')[0]

  const intermedietFile = `build/${basename}.j`
  try {
    const compileOut = execSync(`node . ${file} > ${intermedietFile}`, { encoding: 'utf-8' })
  } catch (error) {
    return error.stderr.split('\n')
  }

  execSync(`java -jar bin/jasmin.jar ${intermedietFile} -d build`)
  return execSync(`java -cp build/ ${basename}`, { encoding: 'utf-8' }).split('\n')
}

export default build_run
