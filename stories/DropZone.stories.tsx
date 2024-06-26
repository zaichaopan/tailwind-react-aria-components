import React from 'react';
import type { Meta } from '@storybook/react';
import { docs } from '../.storybook/docs';
import { DropZone } from '../src/Dropzone';
import { FileTrigger, isFileDropItem } from 'react-aria-components';
import { Button } from '../src/Button';
import { Text } from '../src/Text';
import { Icon } from '../src/Icon';
import { Image } from 'lucide-react';

const meta: Meta<typeof DropZone> = {
  title: 'DropZone',
  component: DropZone,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A <a href="https://react-spectrum.adobe.com/react-aria/DropZone.html#dropzone" target="_blank">**drop zone**</a> is an area into which one or multiple objects can be dragged and dropped..',
      },
      ...docs,
      controls: {
        exclude: /.*/g,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = () => {
  const [droppedImage, setDroppedImage] = React.useState<string | undefined>(
    undefined,
  );

  return (
    <DropZone
      getDropOperation={(types) =>
        types.has('image/jpeg') || types.has('image/png') ? 'copy' : 'cancel'
      }
      onDrop={async (e) => {
        const item = e.items
          .filter(isFileDropItem)
          .find(
            (item) => item.type === 'image/jpeg' || item.type === 'image/png',
          );
        if (item) {
          setDroppedImage(URL.createObjectURL(await item.getFile()));
        }
      }}
    >
      {droppedImage ? (
        <img
          alt=""
          src={droppedImage}
          className="aspect-square h-full w-full object-contain"
        />
      ) : (
        <div className="flex flex-1 flex-col gap-2 pt-6">
          <div className="flex flex-1 justify-center">
            <Icon>
              <Image />
            </Icon>
          </div>
          <div className="flex flex-1">
            <FileTrigger
              acceptedFileTypes={['image/png', 'image/jpeg']}
              allowsMultiple={false}
              onSelect={async (e) => {
                if (e) {
                  const files = Array.from([...e]);
                  const item = files[0];

                  if (item) {
                    setDroppedImage(URL.createObjectURL(item));
                  }
                }
              }}
            >
              <Button
                unstyle
                className="text-nowrap text-base/6 font-medium text-foreground sm:text-sm/6"
              >
                Upload a file
              </Button>
            </FileTrigger>
            &nbsp;
            <Text>or drag and drop</Text>
          </div>
          <div className="flex flex-1 justify-center">
            <Text>PNG, JPG, GIF up to 10MB</Text>
          </div>
        </div>
      )}

      <input type="hidden" name="image" value={droppedImage} />
    </DropZone>
  );
};
