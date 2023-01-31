import {
  GETCATEGORIES,
  GETPRODUCTS,
  GETADMINPRODUCTS,
  ERRORGETPRODUCTS,
  REQUESTSTOCK,
  REQUESTSTOCKERROR,
  GETREQUESTPRICE,
  GETPRODUCTSV2,
  GETFAVPRODUCTSV2,
  GETPREFERRED,
  ADDPREFERRED,
  ADDPREFERREDERROR,
  REMOVEPREFERRED,
  REMOVEPREFERREDERROR,
  GETSHORTDATED,
} from "../constants/actionTypes";

export default (
  state = {
    categories: [],
    products: [],
    requestedProductPrice: [],
    productsv2: null,
    favproductv2: null,
    adminProducts: null,
    prefproduct: [],
    salesRep: null,
    shortDatedProducts: [],
  },
  action
) => {
  switch (action.type) {
    case GETCATEGORIES:
      return { ...state, categories: action.payload };
    case GETPRODUCTS:
      const { products, count } = action.payload;

      return { ...state, products, count };
    case ERRORGETPRODUCTS:
      return { ...state, errorGetProducts: action.payload };
    case GETREQUESTPRICE:
      return { ...state, requestedProductPrice: action.payload };
    case REQUESTSTOCK:
      const { salesRep } = action.payload;

      state.requestedProductPrice.push(action.payload);

      return { ...state, requestStockSuccess: true, salesRep: salesRep };
    case REQUESTSTOCKERROR:
      return { ...state, requestStockSuccess: false };
    case GETPRODUCTSV2:
      return { ...state, productsv2: action.payload };
    case GETADMINPRODUCTS:
      return { ...state, adminProducts: action.payload };
    case GETFAVPRODUCTSV2:
      return { ...state, favproductv2: action.payload };
    case GETPREFERRED:
      return { ...state, prefproduct: action.payload };
    case ADDPREFERRED:
      return { ...state, prefproduct: action.payload, addPrefferedError: null };
    case ADDPREFERREDERROR:
      return { ...state, addPrefferedError: action.payload };
    case REMOVEPREFERRED:
      return {
        ...state,
        prefproduct: action.payload,
        removePrefferedError: null,
      };
    case REMOVEPREFERREDERROR:
      return { ...state, removePrefferedError: action.payload };
    case GETSHORTDATED:
      return { ...state, shortDatedProducts: action.payload };
    default:
      return state;
  }
};
