import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { GifEncoder } from '@skyra/gifenc';
import { buffer } from 'node:stream/consumers';
import { join, resolve } from 'node:path';
GlobalFonts.registerFromPath(join('.', 'node_modules', 'roulette-image', 'fonts', 'Tajawal.ttf'), 'Tajawal');
GlobalFonts.registerFromPath(join('.', 'node_modules', 'roulette-image', 'fonts', 'Arial.ttf'), 'Arial');
GlobalFonts.registerFromPath(join('.', 'node_modules', 'roulette-image', 'fonts', 'DejaVuSans.ttf'), 'DejaVuSans');
GlobalFonts.registerFromPath(join('.', 'node_modules', 'roulette-image', 'fonts', 'Symbola_hint.ttf'), 'Symbola_hint');
GlobalFonts.registerFromPath(join('.', 'node_modules', 'roulette-image', 'fonts', 'Symbola.ttf'), 'Symbola');
GlobalFonts.registerFromPath(join('.', 'node_modules', 'roulette-image', 'fonts', 'NotoEmoji.ttf'), 'NotoEmoji');
GlobalFonts.registerFromPath(join('.', 'node_modules', 'roulette-image', 'fonts', 'NotoRegular.ttf'), 'NotoRegular');

async function createRouletteGifImage(sectors: any[], return_stream = false, fps: (15 | 30) = 15): Promise<any> {
  let main = sectors;
  let gif_image = await createGifImage(120);
  let one_image = await createRouletteImage(main, false, false);
  let getRotateRouletteImage = fps <= 15 ? getRotateRouletteImage15fps : getRotateRouletteImage30fps
  let frames = await getRotateRouletteImage(one_image, "https://i.imgur.com/OpsUf7T.png");
  let one_ctx = await createRouletteImage(main, true);

  let roulette_images = [...frames, one_ctx];

  for (let image_ctx of roulette_images) {
    let delay = roulette_images.indexOf(image_ctx) >= 14 ? 150 : roulette_images.indexOf(image_ctx) >= 11 ? 120 :
      roulette_images.indexOf(image_ctx) >= 7 ? 100 : 75;
    await gif_image.encoder.setDelay(25);
    await gif_image.encoder.addFrame(image_ctx);
  }

  if (roulette_images.length > 0) {
    await gif_image.encoder.finish();
    return return_stream ? gif_image.stream : await buffer(gif_image.stream);
  }
}

async function createGifImage(delay = 120): Promise<{ encoder: GifEncoder; loadImage: typeof loadImage; stream: NodeJS.ReadableStream }> {
  const encoder = new GifEncoder(500, 500);
  const stream = encoder.createReadStream();
  encoder.start();
  encoder.setRepeat(-1);
  encoder.setQuality(1);
  encoder.setTransparent(1);
  return { encoder, loadImage, stream };
}

async function getRotateRouletteImage15fps(image_buffer: Buffer, specific_win_avatar: string): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    const img = await loadImage(image_buffer);
    const avatar = await loadImage(specific_win_avatar);
    const canvasWidth = 500;
    const canvasHeight = 500;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const angleIncrement = (2 * Math.PI) / 15;
    const frames: any[] = [];

    for (let i = 0; i < 15; i++) {
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext('2d')!;
      ctx.save();

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const angle = angleIncrement * i;

      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(499, 203);
      ctx.lineTo(468, 230);
      ctx.lineTo(499, 257);
      ctx.fillStyle = '#e2e2e2';
      ctx.fill();
      ctx.closePath();

      const circle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 75,
      };
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.arc(circle.x, circle.y, circle.radius + 2, 0, Math.PI * 2, true);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      const aspect = avatar.height / avatar.width;
      const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
      const hsy = circle.radius * Math.max(aspect, 1.0);
      ctx.drawImage(avatar, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);

      frames.push(ctx);
    }
    resolve(frames);
  });
}


async function getRotateRouletteImage30fps(image_buffer: Buffer, specific_win_avatar: string): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    const img = await loadImage(image_buffer);
    const avatar = await loadImage(specific_win_avatar);
    const canvasWidth = 500;
    const canvasHeight = 500;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const angleIncrement = (2 * Math.PI) / 30;
    const frames: any[] = [];

    for (let i = 0; i < 30; i++) {
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext('2d')!;
      ctx.save();

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const angle = angleIncrement * i;

      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(499, 203);
      ctx.lineTo(468, 230);
      ctx.lineTo(499, 257);
      ctx.fillStyle = '#e2e2e2';
      ctx.fill();
      ctx.closePath();

      const circle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 75,
      };
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.arc(circle.x, circle.y, circle.radius + 2, 0, Math.PI * 2, true);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      const aspect = avatar.height / avatar.width;
      const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
      const hsy = circle.radius * Math.max(aspect, 1.0);
      ctx.drawImage(avatar, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);

      frames.push(ctx);
    }
    resolve(frames);
  });
}

async function createRouletteImage(sectors: any[], return_ctx = false, pointer = true, specific_win_avatar?: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d')!;
    const sectorAngle = (2 * Math.PI) / sectors.length;
    sectors.forEach(async (sector, i) => {
      const startAngle = sectorAngle * i;
      const endAngle = startAngle + sectorAngle;
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 244, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sector.color;
      ctx.fill();
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate(startAngle + sectorAngle / 2);
      let text = `${sector.number + 1}- ${sector.username}`.trim();
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.font = "bold " + Math.round(24 - sectors.length * 0.25) + "px Tajawal,Symbola,Symbola_hint,DejaVuSans,NotoRegular,NotoEmoji,Arial";
      ctx.fillText(text.length >= 14 ? text.slice(0, 12) + ".." : text.slice(0, 16), 86, 4);
      ctx.restore();
      const angle = i * sectorAngle;
      const x = Math.cos(angle) * 244 + 250;
      const y = Math.sin(angle) * 244 + 250;
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.lineTo(x, y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.arc(250, 250, 244, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    if (pointer) {
      ctx.beginPath();
      ctx.moveTo(499, 203);
      ctx.lineTo(468, 230);
      ctx.lineTo(499, 257);
      ctx.fillStyle = '#e2e2e2';
      ctx.fill();
      ctx.closePath();

      const avatar = await loadImage(specific_win_avatar ? specific_win_avatar : sectors[sectors.length - 1].avatarURL);
      const circle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 75,
      };
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.arc(circle.x, circle.y, circle.radius + 2, 0, Math.PI * 2, true);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      const aspect = avatar.height / avatar.width;
      const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
      const hsy = circle.radius * Math.max(aspect, 1.0);
      ctx.drawImage(avatar, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);
    }
    resolve(return_ctx ? ctx : await canvas.toBuffer('image/png'));
  });
}

function getRandomNumber(length: number, excludedNumbers: number[] = []): number {
  var number = 0;
  do {
    number = Math.floor(Math.random() * length) + 1;
  } while (excludedNumbers.includes(number));
  return number;
}

function getRandomGifColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  return '#' + hex;
}

function getRandomDarkHexCode(): string {
  let letters = '0123456789ABCDEF';
  let color = '#';
  let lightness = Math.floor(Math.random() * 25);
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  let darkColor = color;

  while (getBrightness(darkColor) >= 128 || darkColor === '#000000') {
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    darkColor = color;
  }

  return darkColor;
}

function getBrightness(color: string): number {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return brightness;
}

function shuffleArray(arr: any[], specific_num?: number): any[] {
  let random_number = specific_num ? specific_num : Math.floor(Math.random() * arr.length) + 1;
  return [...arr.slice(arr.length - random_number), ...arr.slice(0, arr.length - random_number)];
}

export { createRouletteGifImage, shuffleArray, getRandomDarkHexCode, createRouletteImage, getRandomNumber };
