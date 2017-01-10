# chai-spec-generator

This extension will generate chai test specs from a javascript object.

## Usage

Select a javascript object in a text editor and press `Ctrl + U` / `Cmd + U`

## Example

```
{
  status: 'deleted',
  item: {
    name: 'Sample User',
    userId: 'sample1@user.com',
    active: true,
    roles: []
  }
}

// the following code will be generated from the above object

target.should.be.a('object');
target.should.have.property('status');
target.status.should.be.equal('deleted');
target.status.should.have.property('item');
target.status.item.should.be.a('object');
target.status.item.should.have.property('name');
target.status.item.name.should.be.equal('Sample User');
target.status.item.name.should.have.property('userId');
target.status.item.name.userId.should.be.equal('sample1@user.com');
target.status.item.name.userId.should.have.property('active');
target.status.item.name.userId.active.should.be.equal(true);
target.status.item.name.userId.active.should.have.property('roles');
target.status.item.name.userId.active.roles.should.be.a('array');
target.status.item.name.userId.active.roles.should.be.length(0);
```

```
{
  status: 'deleted',
  item: [{
    name: 'Sample User',
    userId: 'sample1@user.com',
    active: true,
    roles: []
  }]
}

// the following code will be generated from the above object

target.should.be.a('object');
target.should.have.property('status');
target.status.should.be.equal('deleted');
target.status.should.have.property('item');
target.status.item.should.be.a('array');
target.status.item.should.be.length(1);
target.status.item.should.all.have.property('name')
target.status.item.should.all.have.property('userId')
target.status.item.should.all.have.property('active')
target.status.item.should.all.have.property('roles')
```

## Contributing

Contributions are very welcome! Just send a pull request. Feel free to contact me or checkout my [Github](https://github.com/rintoj/chai-spec-generator) page.

## Author

**Rinto Jose** (rintoj)

Follow me:
  [Github](https://github.com/rintoj)
| [Facebook](https://www.facebook.com/rinto.jose)
| [Twitter](https://twitter.com/rintoj)
| [Google+](https://plus.google.com/+RintoJoseMankudy)
| [Youtube](https://youtube.com/+RintoJoseMankudy)

## License

```
The MIT License (MIT)

Copyright (c) 2016 Rinto Jose (rintoj)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

**Enjoy!**
