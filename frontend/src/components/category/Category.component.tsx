import { FC } from 'react';
import { Link } from 'react-router-dom';
import './category.styles.scss';

type CategoryT = {
  title: String;
  user: string;
  _id: string;
  goal: string;
};

type props = {
  category: CategoryT;
};

const Category: FC<props> = ({ category }) => {
  return (
    <div className="category-container container mb-3">
      <div className="card text-center">
        <div className="card-header">{category.title}</div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <div className="actions-container">
            <Link className="btn btn-primary" to="/">
              View
            </Link>
            <Link className="btn btn-secondary" to="/">
              Edit
            </Link>
            <button
              onClick={() => {
                alert('Are you sure ?');
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
};

export default Category;
