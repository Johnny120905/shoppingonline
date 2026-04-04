import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // QUAN TRỌNG: Phải có dòng này
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    // Xử lý Sản phẩm mới
    const newprods = this.state.newprods.map((item) => {
      if (!item || !item._id) return null; 
      return (
        <div key={item._id} className="modern-product-card">
          <Link to={'/product/' + item._id} className="modern-product-link">
            <div className="product-image-container">
              <span className="product-badge badge-new">Mới</span>
              <img
                className="modern-product-image"
                src={item.image ? 'data:image/jpg;base64,' + item.image : 'https://via.placeholder.com/300'}
                alt={item.name || 'Sản phẩm'}
              />
            </div>
            <div className="modern-product-info">
              <h3 className="modern-product-name">{item.name || 'Tên sản phẩm'}</h3>
              <div className="modern-product-price">
                {item.price ? item.price.toLocaleString('vi-VN') : '0'} ₫
              </div>
            </div>
          </Link>
        </div>
      );
    });

    // Xử lý Sản phẩm Hot
    const hotprods = this.state.hotprods.map((item) => {
      if (!item || !item._id) return null; 
      return (
        <div key={item._id} className="modern-product-card">
          <Link to={'/product/' + item._id} className="modern-product-link">
            <div className="product-image-container">
              <span className="product-badge badge-hot">Hot</span>
              <img
                className="modern-product-image"
                src={item.image ? 'data:image/jpg;base64,' + item.image : 'https://via.placeholder.com/300'}
                alt={item.name || 'Sản phẩm'}
              />
            </div>
            <div className="modern-product-info">
              <h3 className="modern-product-name">{item.name || 'Tên sản phẩm'}</h3>
              <div className="modern-product-price">
                {item.price ? item.price.toLocaleString('vi-VN') : '0'} ₫
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Đột Phá Hiệu Năng.<br/>Dẫn Đầu Xu Hướng.</h1>
            <p className="hero-subtitle">Khám phá thế hệ Laptop siêu mỏng nhẹ, tối ưu cho đồ hoạ và gaming.</p>
            <button className="btn-primary" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Khám phá ngay</button>
          </div>
        </div>

        <div className="home-content-wrapper">
          {this.state.newprods.length > 0 && (
            <div className="home-section">
              <div className="section-header"><h2>Sản Phẩm Mới Ra Mắt</h2></div>
              <div className="modern-product-grid">{newprods}</div>
            </div>
          )}

          {this.state.hotprods.length > 0 && (
            <div className="home-section">
              <div className="section-header"><h2>Sản Phẩm Bán Chạy</h2></div>
              <div className="modern-product-grid">{hotprods}</div>
            </div>
          )}

          {this.state.newprods.length === 0 && this.state.hotprods.length === 0 && (
            <div style={{textAlign: 'center', padding: '50px', color: '#666'}}>
              <p>Hiện tại chưa có sản phẩm nào. Vui lòng thêm sản phẩm ở trang Admin.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      if (res.data) this.setState({ newprods: res.data });
    }).catch(err => console.log(err));
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      if (res.data) this.setState({ hotprods: res.data });
    }).catch(err => console.log(err));
  }
}

export default Home;