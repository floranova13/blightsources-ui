import React from 'react';
import {
  GiStoneBlock,
  GiBottleVapors,
  GiPlantSeed,
  GiMushroomsCluster,
  GiStarSwirl,
  GiMetalBar,
  GiStoneTablet,
  GiCrystalGrowth,
  GiHealthPotion,
  GiPoisonBottle,
  GiFlameSpin,
  GiPerfumeBottle,
  GiPoisonGas,
  GiFog,
  GiVineFlower,
  GiMushrooms,
  GiBleedingWound,
  GiPollenDust,
  GiStoneSphere,
  GiBallGlow,
  GiGlowingArtifact,
  GiTwoCoins,
} from 'react-icons/gi';
import { IoFlaskSharp } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { toTitleCase } from '../utils';

const getIcon = (s, size) => {
  switch (s) {
    case 'coins':
      return (
        <GiTwoCoins size={size} className='inline-block' color='#ecd344' />
      );
    case 'blightstones':
      return (
        <GiStoneBlock size={size} className='inline-block' color='#8ac4ffff' />
      );
    case 'blightichors':
      return (
        <IoFlaskSharp size={size} className='inline-block' color='#2b3a67ff' />
      );
    case 'blightfumes':
      return (
        <GiBottleVapors
          size={size}
          className='inline-block'
          color='#f7b2b7ff'
        />
      );
    case 'blightflora':
      return (
        <GiPlantSeed size={size} className='inline-block' color='#132a13ff' />
      );
    case 'blightfungi':
      return (
        <GiMushroomsCluster
          size={size}
          className='inline-block'
          color='#c5efcbff'
        />
      );
    case 'blightanomalies':
      return (
        <GiStarSwirl size={size} className='inline-block' color='#432534ff' />
      );
    case 'blightfoils':
      return (
        <GiMetalBar size={size} className='inline-block' color='#8ac4ffff' />
      );
    case 'crystali':
      return (
        <GiCrystalGrowth
          size={size}
          className='inline-block'
          color='#8ac4ffff'
        />
      );
    case 'leylodes':
      return (
        <GiStoneTablet size={size} className='inline-block' color='#8ac4ffff' />
      );
    case 'lifeblight':
      return (
        <GiHealthPotion
          size={size}
          className='inline-block'
          color='#2b3a67ff'
        />
      );
    case 'blightvenoms':
      return (
        <GiPoisonBottle
          size={size}
          className='inline-block'
          color='#2b3a67ff'
        />
      );
    case 'blightmares':
      return (
        <GiFlameSpin size={size} className='inline-block' color='#2b3a67ff' />
      );
    case 'rushblight':
      return (
        <GiPerfumeBottle
          size={size}
          className='inline-block'
          color='#f7b2b7ff'
        />
      );
    case 'miasmeta':
      return (
        <GiPoisonGas size={size} className='inline-block' color='#f7b2b7ff' />
      );
    case 'blightmists':
      return <GiFog size={size} className='inline-block' color='#f7b2b7ff' />;
    case 'blightblooms':
      return (
        <GiPlantSeed size={size} className='inline-block' color='#132a13ff' />
      );
    case 'blightpillars':
      return (
        <GiVineFlower size={size} className='inline-block' color='#132a13ff' />
      );
    case 'blightsnarls':
      return (
        <GiStarSwirl size={size} className='inline-block' color='#132a13ff' />
      );
    case 'blightshrooms':
      return (
        <GiMushrooms size={size} className='inline-block' color='#c5efcbff' />
      );
    case 'blightbleeds':
      return (
        <GiBleedingWound
          size={size}
          className='inline-block'
          color='#c5efcbff'
        />
      );
    case 'sporesprawls':
      return (
        <GiPollenDust size={size} className='inline-block' color='#c5efcbff' />
      );
    case 'tokens':
      return (
        <GiStoneSphere size={size} className='inline-block' color='#432534ff' />
      );
    case 'loci':
      return (
        <GiBallGlow size={size} className='inline-block' color='#432534ff' />
      );
    case 'vestiges':
      return (
        <GiGlowingArtifact
          size={size}
          className='inline-block'
          color='#432534ff'
        />
      );
    default:
      return <></>;
  }
};

const Icon = ({ icon, size = '16' }) => {
  return <>{getIcon(icon, size)}</>;
};

export default Icon;
