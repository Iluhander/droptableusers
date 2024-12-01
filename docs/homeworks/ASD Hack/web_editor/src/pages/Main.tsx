import { MainLayout } from "@entities/common/MainLayout";
import { Editor } from "@monaco-editor/react";
import { FC } from "react";

interface IMainPageProps {
  
}

const MainPage: FC<IMainPageProps> = () => {
  return (
    <MainLayout>
      <Editor height="90vh" defaultLanguage="yaml" defaultValue="" />
    </MainLayout>
  );
};

export default MainPage;