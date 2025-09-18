import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { histories } from "@data";

export const HistoryBanner = () => {
  return (
    <Box
      sx={{
        fontFamily: '"Anton", sans-serif',
      }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
        Our History
      </h2>
      <div className="relative">
        <div className="card absolute mx-auto left-8 top-0 h-[260px] sm:h-[250px] w-1 "></div>
        {histories.map((item, idx) => (
          <div key={idx} className="flex items-start mb-12 relative">
            <div className="w-20 text-right pr-4">
              <div className="card inline-block px-4 py-2.5 w-20 text-center border rounded-2xl text-sm  font-serif">
                {item.year}
              </div>
            </div>
            <div className="relative">
              {/* Timeline Icon */}
              <span className="absolute border-[var(--card)] top-12 -left-15.5 flex items-center justify-center w-8 h-8  border-4  rounded-full z-10">
                {item.checked ? (
                  <CheckCircleIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </span>
            </div>
            <div className="card font-serif ml-20   rounded-2xl shadow-md py-4 px-6 max-w-full sm:max-w-4xl">
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

