---
title: 'Mastering dependencies management in React projects : Best practices and Insights'
field: 'web developement, tips'
date: '2024-12-16'
tags: 'package manager, yarn, react, javascript, git, web security'
---

Dependency management is a crucial aspect of any React project, impacting both security and performance. In this article, we will explore strategies and best practices for managing your project’s dependencies, including auditing, fixing direct and indirect vulnerabilities, and ensuring consistency across environments.

## Audit Dependencies and Fix Vulnerabilities

To scan all dependencies (external packages added to the application) the built-in cli **yarn audit** could be used.

`yarn audit` command scans for known security issues in the installed packages. Each issue is displayed with its related order of severity(e.g: low, moderate, high, critical)

![yarnAuditResults](/images/yarnAuditResults.png)_yarn audit Results_

### How to fix vulnerabilities in dependencies

#### Direct dependencies

You can easily use the `yarn audit fix` command to automatically fix vulnerabilities, or manually upgrade the vulnerable package to a newer non-vulnerable version.

#### Transitive dependencies

It is likely the vulnerable package is not a direct dependency, but instead is a transitive dependency (indirect dependency, a dependency of a dependency).
In such a case, the first thing to do is to check out which direct dependency (and sub-dependencies) depend on the vulnerable package.  
`yarn why <vulnerable dependency> ` command will print more information about the dependency tree if necessary.

##### **Example**

From the audit results of the project, we have learned that package **hawk**, version 3.1.3 is vulnerable (CVE-2022-29167).  
It is clear, that it is a transitive dependency of **winston-loggly@1.3.1** .

![yarnAuditResults](/images/yarnAuditResults.png)_yarn audit Results_

For more details, we can use `yarn why` to find all the packages associated with this vulnerable dependency.

```batch
yarn why hawk
- yarn why v1.22.4
[1/4] Why do we have the module "hawk"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "hawk@3.1.3"
info Reasons this module exists
   - "winston-loggly#loggly#request" depends on it
   - Hoisted from "winston-loggly#loggly#request#hawk"
info Disk size without dependencies: "104KB"
info Disk size with unique dependencies: "196KB"
info Disk size with transitive dependencies: "196KB"
info Number of shared dependencies: 4
Done in 1.17s.
```

The best solution would be to upgrade **winston-loggly** to a newer version that uses a non-vulnerable version of **hawk**. However, as of this writing, no such version of **winston-loggly** exists.

To fix this particular vulnerability in our project, we need to force the transitive dependency, Hawk, to a vulnerability-free version.
This would be relatively easy using yarn [selective dependency resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/).

After updating our package.json file as described by selective dependency resolutions:

```json
  ...
  "resolutions": {
    "hawk": "9.0.1"
  }
  ...
```

Run yarn install, and verify the transitive dependency is updated to a new version.

## Avoid it works on my machine issues

### Install exact version

When running `yarn install` command, the project dependencies exist in packages.json file will be installed (added to node_modules folder). However, how the package manager install the right version ?
Packages generally follow **Semantic Versioning (SemVer)**, where:

-   Major versions (e.g., `1.0.0` → `2.0.0`) can include breaking changes.
-   Minor versions (e.g., `1.1.0` → `1.2.0`) add features in a backward-compatible way.
-   Patch versions (e.g., `1.1.0` → `1.1.1`) fix bugs in a backward-compatible way.

By default, newly installed packages can be updated to the latest minor or patch versions, which is reflected by the caret (^) in the package.json file:

```json
...
{
  "dependencies": {
    "example-package": "^1.2.3" // Allows updates to 1.x.x
  }
}
```

> The caret (^) allows updates to the latest minor or patch version, but it can still introduce unexpected issues, especially when package maintainers make breaking changes in minor or patch releases.

This is the reason it is recommended to use the exact version when installing new package :

-   `yarn add - <package...> // -E (--exact) : ^ won't used`.

Using Exact version not only **Avoiding Bugs and minimizing regressions** from Recent packages updates. it is also **Ensuring Build Consistency** where all developers and environments use the same version.

### Use Package Manager lock file

In addition to exact versions approach, consider using the **lock file** `package-lock.json` for npm or `yarn.lock` for Yarn, which ensures consistent dependency versions even when using version ranges.  
Ensure the lock file is not included in .gitignore so that it’s tracked in your version control system. Therefore, whenever the project is pulled from Git repository it will be considered as a guide for the package manager to install the adequate and consistent dependencies versions.

## Best Practices and Practical Considerations

-   Check the health of third-party packages: Before integrating a package into your project, verify its credibility and the frequency of updates using tools like [Snyk Advisor](https://snyk.io/advisor/).

*   **Use exact versions**: Whenever possible, prefer adding packages with the exact version, to ensure build consistency across all environments.
    ```batch
    yarn add -E <package...>
    ```
*   **Avoid immediate upgrades**: Instead of upgrading to the latest version right away, wait a bit until the package has been widely adopted and any bugs are ironed out.
*   Review changelogs: Always check the changelog before upgrading packages to understand what has changed and whether it might affect your project.
*   **Prevent Scripts Execution**: When installing new packages, consider adding the --ignore-scripts flag to mitigate the risk of malicious scripts being executed, especially for unknown or untrusted packages. This helps protect your environment from rogue behavior. However, using this flag may cause functionality issues if the package relies on installation scripts for proper setup. Therefore, it should be used cautiously.
    ```batch
    yarn add -E <package...> --ignore-scripts
    ```

## Conclusion

Managing dependencies efficiently in React projects is vital for ensuring security, performance, and consistency across your development environments. By auditing dependencies, using exact versions, and following best practices, you can minimize risks and keep your projects stable and secure.

Thank you for reading! 🙂
