import styled from "styled-components/native";
import fonts from "./fonts";
import metrics from "./metrics";
import color from "./colors";
import Constants from 'expo-constants';

interface PropsContent{
    paddingTop?:number,
    padding?:number,
    startAlign?:boolean
}

interface IColor{
    color?:string
}

interface IDimension{
    width?:string,
    height?:string
}

interface IAlign{
    align?:string
}

export const Container = styled.View`
    
    flex:1;
    align-items:center;
    background-color:rgb(235,235,235);
    
`;

export const Content = styled.View<PropsContent & {headerColor?:boolean, fullHeight?:boolean}>`
    
    flex:${props=> props.fullHeight && 1};
    width:100%;
    height: ${props=> props.fullHeight ? (metrics.screenHeight-80-Constants.statusBarHeight)+"px" : "auto"};
    align-items:center;
    justify-content: ${props=> props.startAlign ? "flex-start" : "center"};
    padding: ${props=> `${props.padding || 0}px`};
    padding-top: ${props=> `${props.paddingTop || 0}px`};
    background-color: ${props=> props.headerColor ? color.logo : "rgb(235,235,235)"};
    
`;

export const Row = styled.View<IAlign>`

    flex-direction: row;
    align-items: center;
    flex-wrap:wrap;
    justify-content: ${props => props.align || "center"};
    width: 100%;
`; 

export const Column = styled.View`

    flex-direction: column;
    align-items: center;
    
`; 

export const AlignStart = styled.View<IDimension>`

    align-items:flex-start;
    width:${props => props.width || "90%"};
    
`;

export const Button = styled.TouchableOpacity<IDimension>`

  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${color.logo};
  border-radius:8px;
  width:${props => props.width || "90%"};
  height:${props => props.height || "50px"};
`;

export const TransparentButton = styled.TouchableOpacity`

    background:transparent;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
`;

export const TextButton = styled.Text<IColor>`

  font-weight: 700;
  font-size: ${ `${fonts.big}px`};
  color: ${props => props.color || "white"};
`;

export const Input = styled.TextInput<IDimension>`

    width:${props => props.width || "90%"};
    height:${props => props.height || "50px"};
    border: solid 1px ${color.backgroundLight};
    border-radius:8px;
    font-size: ${ `${fonts.big}px`};
    padding-left:15px;
    margin:${ `${metrics.padding}px`} 0 ${ `${metrics.padding}px`} 0;

`;

export const Title = styled.Text<IColor & {bold?:boolean, padding?:number, font?:number}>`

    font-size: ${props=> `${props.font || fonts.bigger}px`};
    font-weight: ${props => props.bold ? "bold" : 700};
    padding:${props=> `${props.padding ? props.padding : metrics.padding}px !important`};
    color: ${props => props.color || color.darker};
`;

export const SubTitle = styled(Title)<{font?:number}>`
    font-size: ${props=> `${props.font || fonts.big}px`};
`;

export const SubTitleNoPadding = styled(Title)`
    font-size: ${props=> `${props.font || fonts.big}px`};
    padding: 0;
`;

export const NormalText = styled.Text<IColor & {font?:number}>`

font-size: ${props=> `${props.font || fonts.regular}px`};
    color: ${props => props.color || color.darker};
    padding:${ `${(metrics.padding)/2}px`};
`;

export const SmallText = styled(NormalText)`

    font-size: ${ `${fonts.small}px`};
`;

export const Border = styled(Row)<IDimension & IColor>`

    width:${props => props.width || "90%"};
    border: solid 1px ${props => props.color || color.backgroundLight};
    border-radius:8px;
    padding:${ `${(metrics.padding)/2}px`};
    margin-bottom:${ `${(metrics.padding)}px`};
    height:${props => props.height || "auto"};
`;


export const ImageWithBackground = styled.Image<IDimension & IColor>`

    width:${props => props.width || "100%"};
    height:${props => props.height || "100%"};
    background-color: ${props => props.color || "#e1e4e8"};
`;

export {color as colors, Constants as constants, metrics, fonts};
