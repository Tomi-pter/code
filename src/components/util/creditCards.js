import VisaLogo from '../../assets/img/cc/visa.svg';
import MastercardLogo from '../../assets/img/cc/mastercard.svg';
import AmexLogo from '../../assets/img/cc/amex.svg';
import DiscoverLogo from '../../assets/img/cc/discover.svg';
import DinersLogo from '../../assets/img/cc/diners-club.svg';
import JCBLogo from '../../assets/img/cc/jcb.svg';
import UnionPayLogo from '../../assets/img/cc/unionpay.svg';
import Default from '../../assets/img/cc/default.svg';

const creditCardTypes = [
  {
    brand: 'visa',
    image: VisaLogo,
    text: 'Visa',
  },
  {
    brand: 'mastercard',
    image: MastercardLogo,
    text: 'Mastercard',
  },
  {
    brand: 'amex',
    image: AmexLogo,
    text: 'American Express',
  },
  {
    brand: 'discover',
    image: DiscoverLogo,
    text: 'Discover',
  },
  {
    brand: 'diners',
    image: DinersLogo,
    text: 'Diners Club',
  },
  {
    brand: 'jcb',
    image: JCBLogo,
    text: 'JCB',
  },
  {
    brand: 'unionpay',
    image: UnionPayLogo,
    text: 'UnionPay',
  }
];

export const getCreditCardType = (brand) => {
  const type = creditCardTypes.find(card => {
    return card.brand === brand.toLowerCase()
  });
  if (type) {
    return type.image;
  }
  /**
   * return unknown if invalid
   */
  return Default
};
