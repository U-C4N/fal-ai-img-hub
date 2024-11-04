import * as fal from '@fal-ai/serverless-client';
import { useStore } from '../store/useStore';

fal.config({
  credentials: 'c585f4f3-94af-43d4-822a-d07b92f578c0:52819b29eea9bed8ccffb67a1fcf8a4c',
});

const DEFAULT_NEGATIVE_PROMPT = 'ugly, blurry, low quality, distorted, deformed';

export async function generateImage(prompt: string) {
  const store = useStore.getState();
  const { settings } = store;

  try {
    const result = await fal.run('fal-ai/flux/dev', {
      input: {
        prompt: prompt,
        negative_prompt: DEFAULT_NEGATIVE_PROMPT,
        num_inference_steps: settings.steps,
        num_images: 4,
        width: settings.width,
        height: settings.height,
        guidance_scale: settings.guidance,
        scheduler: 'euler_a',
        seed: settings.seed
      },
    });

    if (!result?.images) {
      throw new Error('No images were generated');
    }

    return {
      images: result.images.map((img: any) => img.url)
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to generate images. Please try again.');
  }
}