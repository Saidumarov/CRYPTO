import cls from "./index.module.scss";
function LoadingProduct() {
  return (
    <div className={cls.loading_product}>
      <div className={cls.loading_product_item}>
        <div className={cls.radus_loading}></div>
        <div className={cls.radus_loading1}></div>
      </div>
    </div>
  );
}

export default LoadingProduct;
