import LangchainComponent from './langchain';
import LangchainParserComponent from './langchainParser';
import Test from './test';

export default function Home() {
  return <>
    <Test />
    <LangchainComponent />
    <LangchainParserComponent/>
  </>
}