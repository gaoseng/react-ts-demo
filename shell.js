const shell = require('shelljs');

if (shell.exec('npm run start').code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
}

