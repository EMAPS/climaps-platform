Climaps platform
======

Climaps platform by EMAPS project

##Installation
If you want to run your instance of Climaps platform locally on your machine, be sure you have the following requirements installed and downloaded the data.

###Requirements

- [Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)
- [Node](http://nodejs.org/)
- [Bower](http://bower.io/#installing-bower)

###Data files

- [contents.zip](http://climaps.eu/contents/contents.zip)
- [dist.zip](http://climaps.eu/contents/dist.zip)

Clone Climaps platform from the command line:

``` sh
$ git clone https://github.com/EMAPS/climaps-platform.git
```

browse to climaps-platform root folder:

``` sh
$ cd climaps-platform
```

install node modules:

``` sh
$ npm install
```

install client-side dependencies:

``` sh
$ bower install
```

unzip ```contents.zip``` and copy the ```contents``` folder in the ```climaps-platform/app/``` folder:

unzip ```dist.zip``` and copy the ```dist``` folder in the ```climaps-platform/bower_components/sigma/``` folder:


You can now run climaps-platform from your local web server:

``` sh
$ grunt serve
```

Once this is running, go to [http://localhost:9000/](http://localhost:9000/)

##Other information
To manage and export data we used [drive-out](https://github.com/medialab/drive-out) software by the [Médialab](http://medialab.sciences-po.fr/) of Sciences Po