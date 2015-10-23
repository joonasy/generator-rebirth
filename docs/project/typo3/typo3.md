## Typo3

Typo3 is Open Source Enterprise CMS and Scalable Web Application Framework.

## Extension structure

Source folder is the extension folder in Typo3 projects. 

```
    extension_name/
    |
    |── Classes/                      # [1]
    |── Configuration/                # [2]
    |── Resources/                    # [3]
    |   |
    |   |── Private/                  # [4]
    |   |   |── Layouts/
    |   |   |── Partials/
    |   |   |   |── Bottom.html       # [5]
    |   |   |   |── Top.html          # [6]
    |   |   |   |── Bottom.dist.html  # [7]
    |   |   |   |── Top.dist.html     # [8]
    |   |   |── Templates/ 
    |   |── Public/                   # [9]
    |
    |── TempMedia/                    # [10]
    `── ext_emconf.php                # [11]
    `── ext_tables.php                # [12]
```

* **1., 2.** Typo3 settings
* **3.** Public files and private files
* **4.** Site layouts, partials and templates
* **5.** This file contains all the JavaScripts and material that are located in the bottom of the HTML document 
* **6.** This file contains all the CSS, JavaScripts and material that are located in the top of the HTML document
* **7., 8.** These are the build process made files which contain the new references to the build assets. These should be ignored from git
* **9.** Public folder where build assets are placed
* **10.** This folder contains temporary material that used mainly in Html templates
* **11., 12** Typo extension configuration

## Workflow

1. UI Designer builds CSS, JavaScript and static Typo3 templates
    * UI Designer should add a separate `html` branch for static templates for easier referencing in the future.
2. Typo3 developer converts the static files to CMS.
3. If deployment settings have been set run `npm run deploy` to build and deploy. Otherwise run `npm run build` and move changed and build files to server manually.

## Useful Typo3 extensions

Here you'll find listed some useful extensions that you should check out first
before writing your own functionality.

### Dev tools

* [nocache](https://github.com/FluidTYPO3/uncache) - Disables caching in Typo3. No need to clear caches manually.
* [t3adminer](https://github.com/TYPO3-svn-archive/t3adminer) - Adminer database admin tool as a module for Typo3.

### Forms

* [Powermail](http://typo3.org/extensions/repository/view/powermail) - All around tool for handling any kind of form.