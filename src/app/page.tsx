import Feed from "@/components/Feed";
import Image from "next/image";

export default function Home() {
  return (
      <section className="text-center">
        <h1 className="head_text">
          Discover & share
          <br className="max-md:hidden"/>
          <span className="orange_gradient"> AI-Powered Prompts</span>
          </h1>

          <p className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid nihil repellendus qui ullam enim debitis quam blanditiis, dicta deleniti aliquam molestias illum itaque tenetur esse obcaecati. Sunt sed quidem cum?
          Corrupti maiores ratione excepturi suscipit placeat asperiores aperiam enim ea iusto officia quos repudiandae, aspernatur libero, quidem voluptatum ex eveniet eaque in, laboriosam possimus culpa ullam laudantium provident ad! Error!</p>

          {/* feed */}
          <Feed/>

      </section>
    
  );
}
