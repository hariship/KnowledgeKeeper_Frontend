import * as React from "react";
const SvgKkLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={88}
    height={19}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="m.075 9.031.04 9.024 2.791.026 2.78.025v-4.443c0-2.455.051-4.404.104-4.34.065.075.197.329.301.569.341.848 4.221 7.91 4.43 8.075.158.126.984.164 3.448.139 1.796 0 3.25-.05 3.25-.089 0-.05-1.297-2.19-2.87-4.758l-2.87-4.67.367-.583c1.18-1.873 4.85-7.872 4.85-7.923 0-.038-1.495-.063-3.317-.063h-3.303L7.992 4.16C6.839 6.449 5.855 8.36 5.79 8.437c-.053.063-.105-1.81-.105-4.152V.02H.05zM30.301.182c-1.494.544-2.399 1.493-2.792 2.936-.262 1-.249 1.645.066 2.62.327 1.038 1.062 1.86 2.07 2.341.656.304.905.355 1.928.355.996 0 1.284-.051 1.9-.33 1.298-.594 2.084-1.62 2.373-3.075.157-.823.013-1.974-.341-2.772-.315-.721-1.167-1.544-1.94-1.873C32.713.03 31.022-.07 30.3.182m2.28 2.328c.827.747.813 2.658-.025 3.48-.747.722-2.045.305-2.36-.758-.288-1.038-.091-2.177.485-2.709.616-.557 1.285-.557 1.9-.013M75.876.106c-1.613.342-2.609 1.038-3.238 2.278-.393.785-.432.962-.432 2 0 .962.052 1.253.34 1.835.695 1.405 1.888 2.114 3.801 2.24 1.062.076 2.452-.101 3.277-.43l.512-.19V3.435H75.94V5.32l.76-.025.748-.025.039.595.04.607h-.643c-1.127 0-1.822-.658-1.966-1.86-.131-1.101.42-2.101 1.324-2.43.524-.19 2.031-.165 2.647.05.289.101.538.19.564.19.013 0 .026-.48.026-1.063V.296l-.655-.14c-.656-.139-2.425-.164-2.95-.05M17.875 4.258V8.37h2.36l.026-2.316.039-2.329 1.743 2.329 1.744 2.316H26V.145h-2.359l-.026 2.164-.04 2.151-1.638-2.151L20.3.145h-2.425zM36.855 2.004c.249 1.038.708 2.873 1.009 4.088l.55 2.215 1.456.038 1.454.038.132-.481c.078-.266.393-1.48.72-2.696.472-1.797.603-2.139.669-1.835.052.215.315 1.266.59 2.341s.537 2.114.576 2.304l.08.354h2.725l.145-.544C47.262 6.725 48.94.27 48.94.206c0-.062-2.49-.1-2.49-.037-.236 1.633-.905 5.657-.905 5.48-.013-.215-.852-4.1-1.127-5.227-.066-.266-.131-.278-1.481-.278h-1.403l-.695 2.569c-.367 1.405-.681 2.67-.681 2.797 0 .14-.026.215-.066.177-.065-.063-.852-5.126-.852-5.442 0-.063-.642-.101-1.428-.101h-1.416zM50.12 4.258V8.37h5.518l-.04-.987-.039-.975-1.31-.025c-.721-.013-1.39-.025-1.468-.025-.132-.013-.17-.722-.17-3.114v-3.1H50.12zM56.673 4.258V8.37h5.505v-.95c0-.518-.039-.961-.091-.961a21 21 0 0 0-1.285-.05c-.642-.026-1.284-.051-1.402-.051-.184-.013-.236-.127-.236-.582v-.57h2.621V3.321l-1.271-.038-1.285-.038V2.106l1.35-.038 1.337-.038V.144h-5.243zM63.49 4.258V8.37h2.136c3.04 0 3.998-.316 5.033-1.62 1.245-1.582 1.036-4.48-.406-5.67C69.36.334 68.43.145 65.77.145h-2.28zm4.377-1.848c.616.38.918 1.076.839 2.038-.079 1.151-.72 1.835-1.796 1.949-.956.101-.93.164-.93-2.127 0-1.139.039-2.1.105-2.151.157-.165 1.337.025 1.782.291M81.577 4.258V8.37h5.518000000000001l-.039-.987-.04-.975-1.31-.025c-.72-.013-1.39-.025-1.468-.025-.118-.013-.17-.215-.17-.582v-.57h2.621V3.321l-1.271-.038-1.285-.038V2.106l1.35-.038 1.337-.038V.144h-5.243zM17.94 9.917c-.039.089-.052 1.962-.039 4.151l.04 3.987 2.425.038c1.337.013 2.556 0 2.726-.038.262-.063.288-.14.288-1.013v-.949h-2.883v-1.2269999999999999l1.245.012c1.415.025 1.415.038 1.363-1.025-.052-.95-.013-.924-1.376-.924h-1.232V11.79h2.766l-.04-.987-.04-.975-2.595-.038c-2.044-.038-2.595-.012-2.647.127M24.927 9.854c-.223.05-.236.355-.236 4.088v4.025l.472.088c.262.038 1.494.064 2.752.051l2.281-.025v-1.987h-2.884v-1.228h1.285l1.271-.013.027-.784c0-.443-.014-.874-.053-.975-.052-.126-.393-.164-1.297-.164h-1.233v-1.14h2.767l-.04-.987-.04-.974-2.424-.013c-1.337-.012-2.53 0-2.648.038M31.441 9.905c-.04.1-.052 1.974-.04 4.164l.04 3.986.983.038c1.626.063 1.573.114 1.573-1.405v-1.29l.892-.026c2.201-.076 3.434-1.114 3.434-2.898-.014-1.316-.577-2.114-1.77-2.456-.288-.075-1.546-.177-2.779-.215-1.86-.063-2.28-.038-2.333.102m3.92 2c.248.202.34.746.183 1.164-.131.354-.55.556-1.154.556-.314 0-.327-.037-.367-.936-.026-.608.013-.975.118-1.025.184-.114.97.05 1.22.24M39.608 9.854c-.223.05-.236.355-.236 4.088v4.025l.471.088c.263.038 1.495.064 2.753.051l2.28-.025v-1.987h-2.883v-1.228h1.285l1.271-.013.026-.784c0-.443-.013-.874-.052-.975-.053-.126-.393-.164-1.298-.164h-1.232v-1.14h2.766l-.04-.987-.039-.974-2.425-.013c-1.337-.012-2.53 0-2.648.038M46.188 13.928v4.19h.904c.498 0 1.075-.039 1.298-.077l.393-.076-.026-1.38c-.04-1.214-.014-1.379.183-1.379q.669 0 1.376 2.013l.289.835 1.337.013c.72.012 1.363-.026 1.402-.102.04-.063-.144-.658-.406-1.316-.498-1.228-1.036-2-1.534-2.152-.236-.063-.196-.126.354-.417.354-.177.747-.481.878-.658.354-.443.512-1.228.38-1.798-.34-1.43-1.297-1.784-4.993-1.847l-1.836-.026zm3.866-2.076c.184.165.328.418.328.557 0 .43-.538.911-1.114.987l-.525.064.014-.81c.013-.43.026-.874.039-.962.026-.291.917-.177 1.258.164"
    />
  </svg>
);
export default SvgKkLogo;
