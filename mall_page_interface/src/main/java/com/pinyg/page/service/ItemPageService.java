package com.pinyg.page.service;

/**
 * 商品详细页接口
 *
 */
public interface ItemPageService {
    /**
     * 生成商品详细页
     * @param goodsId
     */
    public boolean genItemHtml(Long goodsId);
}
