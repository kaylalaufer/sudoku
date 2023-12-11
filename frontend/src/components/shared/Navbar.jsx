import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";

const Navbar = ({ setBoardDimension, setDifficulty, setCurrentGameId }) => {
  const [show4x4Dropdown, setShow4x4Dropdown] = useState(false);
  const [show9x9Dropdown, setShow9x9Dropdown] = useState(false);
  const dropdown4x4Ref = useRef(null);
  const dropdown9x9Ref = useRef(null);

  const toggle4x4Dropdown = () => {
    setShow4x4Dropdown(!show4x4Dropdown);
    setShow9x9Dropdown(false); // Hide 9x9 dropdown if open
  };

  const toggle9x9Dropdown = () => {
    setShow9x9Dropdown(!show9x9Dropdown);
    setShow4x4Dropdown(false); // Hide 4x4 dropdown if open
  };

  const handleClickOutside = (event) => {
    if (
      dropdown4x4Ref.current &&
      !dropdown4x4Ref.current.contains(event.target) &&
      dropdown9x9Ref.current &&
      !dropdown9x9Ref.current.contains(event.target)
    ) {
      setShow4x4Dropdown(false);
      setShow9x9Dropdown(false);
    }
  };

  const handleDifficultyChange = (dimension, difficulty) => {
    setBoardDimension(dimension);
    setDifficulty(difficulty);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or brand */}
        <Logo />

        {/* Navigation links */}
        <ul className="flex text-2xl">
          <li>
            <a className="cursor-pointer p-4 text-white hover:bg-gray-900 hover:text-gray-300" onClick={() => setCurrentGameId(-1)}>
              New Game
            </a>
          </li>
          <li ref={dropdown4x4Ref}>
            <a
              className={`cursor-pointer p-4 text-white hover:bg-gray-900 hover:text-gray-300 ${show4x4Dropdown ? `bg-gray-900` : ``}`}
              onClick={toggle4x4Dropdown}
            >
              4 x 4
            </a>
            {show4x4Dropdown && (
              <ul className="absolute mt-2 bg-gray-800">
                <li>
                  <a
                    className="block cursor-pointer p-2 text-white hover:bg-gray-900 hover:text-gray-300"
                    onClick={() => handleDifficultyChange(4, 1)}
                  >
                    Easy
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 text-white hover:bg-gray-900 hover:text-gray-300"
                    onClick={() => handleDifficultyChange(4, 2)}
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 text-white hover:bg-gray-900 hover:text-gray-300"
                    onClick={() => handleDifficultyChange(4, 3)}
                  >
                    Hard
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li ref={dropdown9x9Ref}>
            <a
              className={`cursor-pointer p-4 text-white hover:bg-gray-900 hover:text-gray-300 ${show9x9Dropdown ? `bg-gray-900` : ``}`}
              onClick={toggle9x9Dropdown}
            >
              9 x 9
            </a>
            {show9x9Dropdown && (
              <ul className="absolute mt-2 bg-gray-800">
                <li>
                  <a
                    className="block cursor-pointer p-2 text-white hover:bg-gray-900 hover:text-gray-300"
                    onClick={() => handleDifficultyChange(9, 1)}
                  >
                    Easy
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 text-white hover:bg-gray-900 hover:text-gray-300"
                    onClick={() => handleDifficultyChange(9, 2)}
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 text-white hover:bg-gray-900 hover:text-gray-300"
                    onClick={() => handleDifficultyChange(9, 3)}
                  >
                    Hard
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setBoardDimension: PropTypes.func.isRequired,
  setDifficulty: PropTypes.func.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
};

export default Navbar;
