 function Typewriter(element, options) {
        var defaultOptions = {
          typingSpeed: 100, // Speed of typing in milliseconds
          delay: 1000, // Delay between each text in milliseconds
          cursor: "|", // Cursor character
          cursorSpeed: 400, // Speed of cursor blinking in milliseconds
        };

        this.element = element;
        this.textArray = JSON.parse(this.element.dataset.textArray);
        this.options = Object.assign({}, defaultOptions, options);
        this.currentIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.typingSpeed = this.options.typingSpeed;
        this.cursorSpeed = this.options.cursorSpeed;

        this.init();
      }

      Typewriter.prototype.init = function () {
        this.currentText = this.textArray[this.currentIndex];
        this.element.innerHTML = "";
        this.toggleCursor();

        if (!this.isPaused) {
          this.start();
        }
      };

      Typewriter.prototype.start = function () {
        var self = this;

        if (!this.isPaused) {
          if (!this.isDeleting) {
            this.element.innerHTML = this.currentText.substring(
              0,
              this.element.innerHTML.length + 1
            );
            if (this.element.innerHTML === this.currentText) {
              this.isDeleting = true;
              this.typingSpeed = this.options.typingSpeed / 2;
              this.element.innerHTML += this.options.cursor; // Add cursor after text
            }
          } else {
            this.element.innerHTML = this.currentText.substring(
              0,
              this.element.innerHTML.length - 1
            );
            if (this.element.innerHTML === "") {
              this.isDeleting = false;
              this.currentIndex++;
              if (this.currentIndex === this.textArray.length) {
                this.currentIndex = 0; // Reset index to start over
              }
              this.currentText = this.textArray[this.currentIndex];
              this.typingSpeed = this.options.typingSpeed;
            }
          }

          setTimeout(function () {
            self.start();
          }, this.typingSpeed);
        }
      };

      Typewriter.prototype.toggleCursor = function () {
        var self = this;
        var cursorElement = document.createElement("span");
        cursorElement.className = "typewriter-cursor";
        cursorElement.innerText = this.options.cursor;

        this.element.appendChild(cursorElement);
      };

      Typewriter.prototype.pause = function () {
        this.isPaused = true;
      };

      Typewriter.prototype.resume = function () {
        this.isPaused = false;
        this.init();
      };

      var elements = document.querySelectorAll(".typewriter");

      elements.forEach(function (element) {
        var options = {
          typingSpeed: parseInt(element.dataset.typingSpeed) || 100,
          delay: parseInt(element.dataset.delay) || 1000,
          cursor: element.dataset.cursor || "|",
          cursorSpeed: parseInt(element.dataset.cursorSpeed) || 400,
        };

        var typewriter = new Typewriter(element, options);
        typewriter.start();
      });
