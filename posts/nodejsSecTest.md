---
title: 'Approach for security testing node.js applications and integrating it into CI/CD pipeline'
field: 'web security'
date: '2023-03-16'
tags: 'web security, nodejs, git, gitlab, ci-cd, devSecOps'
---

### What is Security Testing

Security is of growing importance, but remains a challenging mission. Application developers face multiple dangers, including programming errors, flaws in the operating system and other weaknesses related to dependencies, weak integrations such as insecure APIs, as well as malicious actions by hackers and some unscrupulous users.

Surfing on the net, you can encounter a lot of articles, blogs and cyber-security specialists that show how the majority of Nodejs applications are vulnerable. According to Snyk company, a popular Node JS security scanning platform, nearly 80% of Node.js applications are vulnerable or use vulnerable packages.

Being aware of potential threats like XSS, SQL injection, sensitive data exposure, authentication issues, etc (please refer to OWASP top 10 vulnerabilities), is the main purpose of security testing. It is also a proactive approach to identify security weaknesses of an application, that can be performed during development phase and integrated into the _continuous integration/continuous deployment CI/CD_ pipelines, unlike the traditional methods done by cyber-security consultants, that use application already deployed and used by customers.

In other words, Security Testing comes into action to help in finding, early, the potential vulnerabilities or let's say discovering the most known ones to fix them before releasing the application and using it in production..

### Security Testing Node.js applications

Basically, to perform a security test for Node.js application three essential steps should be taken into consideration, as seriously as the conception, features implementation, and tools:

1. _Auditing package dependencies_  
   Node.js uses external 3rd party libraries (dependencies) that help implement different components and features of the application.
   Therefore Auditing the dependencies for known vulnerabilities is an important part of applications development
2. _SAST (Static Application Security Testing)_  
   SAST is a testing methodology that analyzes source code to find security vulnerabilities that make an application susceptible to attack. SAST scans an application source code to find weaknesses that may lead to vulnerabilities before the code is compiled.
3. _DAST (Dynamic Application Security Testing)_  
   DAST consists of analyzing a web application to find vulnerabilities through simulated attacks, without any requirement to access the code-source. which means DAST evaluates the application in a production-like (if i can say) environment, or from the outside like a malicious user/hacker would do to attack the application.

In the next section, we will cover _audit dependencies_, how to implement and how to integrate it into the CI/CD gitlab pipeline.

SAST and DAST will be covered later, each one in a dedicated post.

### Auditing dependencies

After installing Node.js, the build-in CLI [npm-audit](https://docs.npmjs.com/cli/v8/commands/npm-audit%20package%20dependencies) or [yarn-audit](https://classic.yarnpkg.com/lang/en/docs/cli/audit/) command can be used for auditing all the dependencies, For sure there are a lot of tools that may achieve more or less the same goal, but not always free :

- Retire.js
- OWASP Dependency-Check
- OSS INDEX
- Snyk
- …

In this article, we can use the built-in yarn command _yarn-audit_ to scan depenencies

To illustrate how to perform the audit, I have chosen [NodeGoat](https://wiki.owasp.org/index.php/Projects/OWASP_Node_js_Goat_Project), a vulnerable Node (express.js) application, created by OWASP for web developers to learn OWASP's Top 10 vulnerabilities. It is also a good example when tackling and dealing with Static and Dynamic Security Testing (SAST and DAST) in the next parts of this article.

In order to get the audit report, we have to clone the NodeGoat first:

1. Clone the repository (GitHub )
   ```bash
   git clone https://github.com/OWASP/NodeGoat.git
   ```
2. jump to the repo code
   ```bash
   cd NodeGoat/
   ```
3. Install dependencies

   ```bash
   yarn install
   ```

   yarn.lock file will be generated

4. run yarn audit command
   ```bash
   yarn audit
   ```

yarn audit Checks for known security issues within the installed packages, and list them in the standart output :

![yarn audit output](/images/yarn-audit-1.png)

![yarn audit output](/images/yarn-audit-2.png)

### CI/CD integration (GitLab)

In software engineering, CI/CD is the combined practice of continuous integration and either continuous delivery or continuous deployment. CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in the building, testing, and deployment of applications.

Using CI/CD is an important approach in the software industry, it facilitates the whole product development lifecycle, and also makes the cooperation between all teams (frontend/backend/design/testers/QA,…) much easier.

![CI-CD workflow](/images/cicd-steps.webp)_CI-CD step_

To check susceptible vulnerabilities in the application before deploying a new version, a new stage can be added to the testing step to perform auditing dependencies, SAST and DAST.

On Gitlab the process of CI/CD is managed using .Gitlab-ci.yml, a yaml file that should be created in the root of the repository, and contains the CI/CD configuration. ( [gitlab docs](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html) for more information)

#### Gitlab-ci.yml

```yml[class='line-numbers']
stages:
  - install dependencies
  - audit dependencies

build:
  image: node:16
  script:
    - yarn install
    - yarn run build:ci
  stage: install dependencies
  artifacts:
    paths:
      - yarn.lock

audit:
  stage: audit dependencies
  image: node:16
  script:
    - yarn audit-node-modules
```

- The first stage is about dependencies installation
- The second stage executes the script `audit-node-modules` which audits dependencies. It is a js script that runs yarn audit command in node:16 image, the pipeline will fail if a HIGH vulnerability is found.

#### audit-node-modules script

```js[class='line-numbers']
#!/usr/bin/env node

'use strict';

const executeCMD = require('./utils/executeCommands');
const { AUDIT_CMD } = require('./utils/commands');

auditNM();

/**
* Checks for known security issues with the installed packages (node modules NM).
* This run `yarn audit` cmd to get vulnerable packages
*/
async function auditNM() {
  try {
    await executeCMD(AUDIT_CMD);
  } catch (error) {
    if (error.code >= 8) {
      console.log('HIGH vulnerabilities found. Please fix used    dependencies');
      process.exit(1);
    }
  }
}
```

As you may know, it is mandatory to add audit-node-modules to the scripts section in the packages.json file to be able to run it in the command line.

![package.json](/images/package.json.png)_package.json file_

It is also clear that the script uses the function executeCMD, which exists in /scripts/utils/executeCommands.js, with AUDIT_CMD as a parameter located under /scripts/utils/commands.js

#### commands.js

```js[class='line-numbers']
module.exports = Object.freeze({
  // *** yarn CMD ***
  AUDIT_CMD: 'yarn audit',
});
```

#### executeCommands.js

```js[class='line-numbers']
const { exec } = require('child_process');
/**
* @param {string} command A shell command to execute
* @return {Promise<string>} A promise that resolve to the output of
* the shell command, or an error
* @example const output = await execute("ls -alh");
*/
const executeCMD = async (command) => {
  return await new Promise(function (resolve, reject) {
    /**
    * @param {Error} error An error triggered during the execution
    * of the childProcess.exec command
    * @param {string|Buffer} standardOutput The result of the shell
    * command execution
    * @param {string|Buffer} standardError The error resulting of
    * the shell command execution
    * @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    */
    exec(command, function (error, standardOutput, standardError) {
      console.log(standardOutput);
      if (error.code >= 8) {
        /**
        * yarn audit exit with a non-0 exit code.
        * If issues of any severity were found. The error
        * code will be a mask of the severities.
        *  - 1 for INFO
        *  - 2 for LOW
        *  - 4 for MODERATE
        *  - 8 for HIGH
        *  - 16 for CRITICAL
        * -----
        * if HIGH vulnerabilities were found, then the exit
        * code will be greater than 8
        */
        reject(error);
      } else resolve(standardOutput);
    });
  });
};
module.exports = executeCMD;
```

The code source for this first part is available in the following Gitlab repo: https://gitlab.com/aMahdaoui/NodeGoat-SecurityTesting/-/tree/audit-dependencies

![pipeline-gitlab](/images/audit-ci-pipeline.webp)_Audit dependencies_  
<br />
![pipeline-job](/images/audit-failed.webp)_CI pipelineaudit job failed due to found HIGH vulnerabilities_
