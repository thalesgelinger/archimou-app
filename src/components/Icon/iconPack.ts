import {SvgProps} from 'react-native-svg';
import person from '../../assets/svg/person.svg';
import calendar from '../../assets/svg/calendar.svg';
import arrow from '../../assets/svg/arrow.svg';

export default {
  person,
  calendar,
  arrow,
} as {[key: string]: React.FC<SvgProps>};
