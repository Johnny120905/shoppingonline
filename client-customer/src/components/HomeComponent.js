import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    // Xử lý danh sách sản phẩm mới
    const newprods = this.state.newprods.map((item) => {
      // Nếu item bị lỗi hoặc không có ID thì bỏ qua không render để tránh sập web
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

    // Xử lý danh sách sản phẩm hot
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
        
        {/* Hero Section - Phần này sẽ luôn hiện dù có sản phẩm hay không */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Đột Phá Hiệu Năng.<br/>Dẫn Đầu Xu Hướng.</h1>
            <p className="hero-subtitle">Khám phá thế hệ Laptop siêu mỏng nhẹ, tối ưu cho đồ hoạ và gaming. Khuyến mãi lên đến 30%.</p>
            <button className="btn-primary" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Khám phá ngay</button>
          </div>
        </div>

        <div className="home-content-wrapper">
          {/* Chỉ hiện phần Sản Phẩm Mới nếu có dữ liệu */}
          {this.state.newprods.length > 0 && (
            <div className="home-section">
              <div className="section-header">
                <h2>Sản Phẩm Mới Ra Mắt</h2>
              </div>
              <div className="modern-product-grid">
                {newprods}
              </div>
            </div>
          )}

          {/* Chỉ hiện phần Sản Phẩm Bán Chạy nếu có dữ liệu */}
          {this.state.hotprods.length > 0 && (
            <div className="home-section">
              <div className="section-header">
                <h2>Sản Phẩm Bán Chạy</h2>
              </div>
              <div className="modern-product-grid">
                {hotprods}
              </div>
            </div>
          )}

          {/* Thông báo nếu Database hoàn toàn trống */}
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

  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new')
      .then((res) => {
        if (res.data) {
          this.setState({ newprods: res.data });
        }
      })
      .catch(err => console.log("Lỗi lấy sản phẩm mới:", err));
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot')
      .then((res) => {
        if (res.data) {
          this.setState({ hotprods: res.data });
        }
      })
      .catch(err => console.log("Lỗi lấy sản phẩm hot:", err));
  }
}

export default Home;