import { FC, ReactNode } from "react";

import './MainLayout.scss';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <div className="mainLayout">
      {children}
    </div>
  );
};

export default MainLayout;