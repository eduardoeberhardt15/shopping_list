import {Dimensions, PixelRatio} from 'react-native';

const widthPercentageToDP = (widthPercent:any) => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};

const heightPercentageToDP = (heightPercent:any) => {
  const screenHeight = Dimensions.get('window').height;
return PixelRatio.roundToNearestPixel(screenHeight * parseFloat(heightPercent) / 100);
};

// Estilizando uma View com os métodos acima

/*
const Tile = styled.View`
  width: ${widthPercentageToDP('98%')};
  height: ${heightPercentageToDP('10%')};
`;
*/