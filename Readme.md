
Roulette Image
====
This package provides functionality to create roulette images and GIFs. It utilizes the `@napi-rs/canvas packag`e for creating and manipulating images, and `@skyra/gifenc` for generating GIFs.

<div align="center">
    <p>
		<a href="https://bio.shuruhatik.com/" target="_blank"><img src="https://i.imgur.com/0Vm4FRF.png" width="212" height="44" alt="Powered by Shuruhatik"/></a>
	</p>
</div>

## Installation
To install roulette-image, run the following command:

```sh
# NPM
npm add roulette-image
# Bun.js
bun add roulette-image
# Yarn
yarn add roulette-image
```

### Usage
Import the required methods from the package:

```javascript
import { createRouletteGifImage } from 'roulette-image';
```

#### Method: createRouletteGifImage

This method generates a GIF image of a rotating roulette wheel with sectors.

```javascript
async function createRouletteGifImage(sectors: any[], return_stream = false): Promise<any>
```

- `sectors`: An array containing the sectors of the roulette wheel.
- `return_stream` (optional): If set to `true`, the method will return a readable stream of the GIF image. Default is `false`.
- Returns: A Promise that resolves to the generated GIF image.

Example usage:

```javascript
const sectors = [
  { number: 0, username: 'User1', color: '#FF0000', avatarURL: 'https://example.com/avatar1.png' },
  { number: 1, username: 'User2', color: '#00FF00', avatarURL: 'https://example.com/avatar2.png' },
  // Add more sectors...
];

const gifBuffer = await createRouletteGifImage(sectors);

await fs.promises.writeFile("roulette.gif", gifBuffer);
console.log('File saved successfully!');
```
- Example of an animated roulette image:
> https://imgur.com/uL65Qm5

## Sponsors 
- Love what I do? Send me some [coffee](https://buymeacoff.ee/shuruhatik) !?  ☕
- Can't send coffees?   Your support will help me to continue working on open-source projects like this.  🙏😇

## Help
If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our official [Discord Server](https://dsc.gg/shuruhatik) .


## License
Refer to the [LICENSE](LICENSE) file.
