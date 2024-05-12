import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import AppText from '@components/AppText';

export interface ICatgoryCardProps {
  title: string;
  imageUri: string;
}

const CatgoryCard: FC<ICatgoryCardProps> = ({ imageUri, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: imageUri,
        }}
        className="w-20 h-20 rounded"
      />
      <AppText
        className="absolute p-1 font-bold text-white bg-opacity-30 bottom-1 left-1"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.28)',
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};
export default CatgoryCard;
