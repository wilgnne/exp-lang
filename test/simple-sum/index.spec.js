import path from 'path';
import { execSync } from 'child_process';

const file = path.resolve(__dirname, 'simple-sum.py')

test('adds 1 + 2 to equal 3', () => {
    execSync(`npm start ${file}`)
    const out = execSync('java -cp build/ Test', { encoding: 'utf-8' })
    expect(out).toBe('3\n');
})
