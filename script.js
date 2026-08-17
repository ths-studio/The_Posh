/* =========================================
   THE POSH — NFC GOOGLE REVIEW SYSTEM
   ========================================= */


/* GOOGLE REVIEW */

const GOOGLE_REVIEW_URL =
    "https://search.google.com/local/writereview?placeid=ChIJ_7eYKgADDTkRbn-XcQ4ieOE";


/* =========================================
   CATEGORY NAMES
   ========================================= */

const names = {

    staff: "Owner / Staff",

    quality: "Product Quality",

    collection: "Collection",

    variety: "Variety",

    pricing: "Pricing",

    fitting: "Fitting",

    ambience: "Store Ambience",

    overall: "Overall Experience"

};


/* =========================================
   REVIEW DATA
   ========================================= */

const data = {

    staff: {

        Poor: [
            "The staff experience could have been better.",
            "I felt the service could have been more attentive."
        ],

        Good: [
            "The staff were polite and helpful.",
            "The service was good overall."
        ],

        Great: [
            "The staff were friendly and helpful throughout my visit.",
            "I really liked the helpful and welcoming staff."
        ],

        Excellent: [
            "The owner and staff were excellent, welcoming and very helpful.",
            "The staff were extremely friendly and made the visit enjoyable."
        ]

    },


    quality: {

        Poor: [
            "The product quality could be better.",
            "I felt the quality and finishing could use some improvement."
        ],

        Good: [
            "The product quality was good overall.",
            "The quality was good and the finishing was decent."
        ],

        Great: [
            "The product quality was great and the finishing felt premium.",
            "I was really impressed with the overall product quality."
        ],

        Excellent: [
            "The product quality was excellent and the finishing felt premium.",
            "The quality was excellent and everything felt very well finished."
        ]

    },


    collection: {

        Poor: [
            "The collection could have had more updated options.",
            "I felt the collection could be improved with more styles."
        ],

        Good: [
            "The collection was good and had some nice options.",
            "There were some good choices in the collection."
        ],

        Great: [
            "The collection was great, with plenty of stylish options.",
            "I really liked the stylish collection available."
        ],

        Excellent: [
            "The collection was excellent and very well curated.",
            "The collection had an excellent range of stylish pieces."
        ]

    },


    variety: {

        Poor: [
            "The variety felt somewhat limited.",
            "I think there could have been more variety to choose from."
        ],

        Good: [
            "The variety was good and there were several options.",
            "There was a good selection to choose from."
        ],

        Great: [
            "I really liked the variety of options available.",
            "The variety was great and gave me plenty of choices."
        ],

        Excellent: [
            "The variety was excellent with plenty of options to explore.",
            "I was impressed by the excellent variety available."
        ]

    },


    pricing: {

        Poor: [
            "I felt the pricing was a little high.",
            "The pricing could be more competitive."
        ],

        Good: [
            "The pricing was reasonable overall.",
            "I felt the pricing was fairly good."
        ],

        Great: [
            "The pricing was great considering the quality.",
            "I thought the pricing offered good value."
        ],

        Excellent: [
            "The pricing felt excellent for the quality offered.",
            "I was very happy with the value for money."
        ]

    },


    fitting: {

        Poor: [
            "The fitting could have been better.",
            "I felt the fitting and comfort could be improved."
        ],

        Good: [
            "The fitting was good overall.",
            "The fit was good and reasonably comfortable."
        ],

        Great: [
            "The fitting was great and the clothes felt comfortable.",
            "I really liked the fit and overall comfort."
        ],

        Excellent: [
            "The fitting was excellent and very comfortable.",
            "The fit was excellent and felt really comfortable."
        ]

    },


    ambience: {

        Poor: [
            "The store ambience could be improved.",
            "I felt the overall store atmosphere could be better."
        ],

        Good: [
            "The store ambience was good and comfortable.",
            "The store had a pleasant ambience."
        ],

        Great: [
            "The store had a great ambience and pleasant feel.",
            "I really liked the overall atmosphere of the store."
        ],

        Excellent: [
            "The store ambience was excellent and made the visit even better.",
            "The atmosphere was excellent and added to the shopping experience."
        ]

    },


    overall: {

        Poor: [
            "Overall, there are a few areas that could be improved.",
            "Overall, I think the experience could have been better."
        ],

        Good: [
            "Overall, it was a good experience.",
            "Overall, I had a fairly good experience."
        ],

        Great: [
            "Overall, it was a great experience and I would visit again.",
            "Overall, I had a really good experience at The Posh."
        ],

        Excellent: [
            "Overall, it was an excellent experience and I would definitely recommend The Posh.",
            "Overall, I had an excellent experience and would happily recommend The Posh."
        ]

    }

};


/* =========================================
   STATE
   ========================================= */

let selected = [];

let ratings = [];


/* =========================================
   ELEMENTS
   ========================================= */

const $ = id =>
    document.getElementById(id);


const screens = [

    $("step1"),

    $("step2"),

    $("step3")

];


const dots =
    document.querySelectorAll(".dot");


const lines =
    document.querySelectorAll(".progress i");


const categoryButtons =
    document.querySelectorAll(".categories button");


const next =
    $("next");


const back =
    $("back");


const generate =
    $("generate");


const ratingsBox =
    $("ratings");


const review =
    $("review");


const copy =
    $("copy");


const google =
    $("google");


const restart =
    $("restart");


const status =
    $("status");


/* =========================================
   CATEGORY SELECTION
   ========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
            button.dataset.cat;


        button.classList.toggle(
            "selected"
        );


        if (
            selected.includes(category)
        ) {

            selected =
                selected.filter(
                    item =>
                        item !== category
                );

        } else {

            selected.push(category);

        }


        next.disabled =
            selected.length === 0;

    });

});


/* =========================================
   STEP 1 → STEP 2
   ========================================= */

next.addEventListener(
    "click",
    () => {

        buildRatings();

        showStep(2);

    }
);


/* =========================================
   BUILD RATING CARDS
   ========================================= */

function buildRatings() {

    ratings = {};

    ratingsBox.innerHTML = "";


    selected.forEach(category => {

        const card =
            document.createElement("div");


        card.className =
            "rating-card";


        card.innerHTML = `

            <div class="rating-title">

                <b>
                    ${names[category]}
                </b>

                <small>
                    Select one
                </small>

            </div>


            <div class="rating-options">

                ${[
                    "Poor",
                    "Good",
                    "Great",
                    "Excellent"
                ]
                .map(rating => `

                    <button
                        data-cat="${category}"
                        data-rate="${rating}">

                        ${rating}

                    </button>

                `)
                .join("")}

            </div>

        `;


        ratingsBox.appendChild(card);

    });


    addRatingListeners();

}


/* =========================================
   RATING BUTTON LISTENERS
   ========================================= */

function addRatingListeners() {

    ratingsBox
        .querySelectorAll(".rating-options button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const category =
                        button.dataset.cat;


                    const rating =
                        button.dataset.rate;


                    ratingsBox
                        .querySelectorAll(
                            `[data-cat="${category}"]`
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );

                        });


                    button.classList.add(
                        "selected"
                    );


                    ratings[category] =
                        rating;

                }
            );

        });

}


/* =========================================
   BACK BUTTON
   ========================================= */

back.addEventListener(
    "click",
    () => {

        showStep(1);

    }
);


/* =========================================
   GENERATE REVIEW
   ========================================= */

generate.addEventListener(
    "click",
    () => {

        const complete =
            selected.every(
                category =>
                    ratings[category]
            );


        if (!complete) {

            showStatus(
                "Please rate each selected category."
            );

            return;

        }


        review.textContent =
            makeReview();


        showStep(3);

    }
);


/* =========================================
   REVIEW GENERATOR
   ========================================= */

function makeReview() {

    const poor =
        selected.filter(
            category =>
                ratings[category] === "Poor"
        );


    const great =
        selected.filter(
            category =>
                ratings[category] === "Great"
        );


    const excellent =
        selected.filter(
            category =>
                ratings[category] === "Excellent"
        );


    const allPositive =
        poor.length === 0;


    const allPoor =
        poor.length === selected.length;


    let openings;


    /* ALL POOR */

    if (allPoor) {

        openings = [

            "I visited The Posh recently and felt there are a few areas that need improvement.",

            "I recently visited The Posh and unfortunately the experience could have been better.",

            "My visit to The Posh was not quite what I expected."

        ];

    }


    /* MIXED */

    else if (
        poor.length &&
        (great.length || excellent.length)
    ) {

        openings = [

            "I had a mixed experience at The Posh, with some things standing out positively while a few could be improved.",

            "My visit had both positives and areas that I think could be better.",

            "There were some things I really liked at The Posh, although a few aspects could use improvement."

        ];

    }


    /* POSITIVE */

    else if (allPositive) {

        openings = [

            "Had a really good experience at The Posh.",

            "I had a lovely experience at The Posh.",

            "Really enjoyed my visit to The Posh.",

            "Had a great experience shopping at The Posh.",

            "My visit to The Posh was a pleasant experience."

        ];

    }


    /* NEUTRAL */

    else {

        openings = [

            "I recently visited The Posh and wanted to share my experience.",

            "Visited The Posh recently and had a few thoughts to share.",

            "I recently had a chance to visit The Posh."

        ];

    }


    const opening =
        random(openings);


    let parts = [];


    /* QUALITY + PRICING */

    if (

        ratings.quality === "Poor" &&

        (
            ratings.pricing === "Great" ||
            ratings.pricing === "Excellent"
        )

    ) {

        parts.push(

            ratings.pricing === "Excellent"

                ? "The product quality could be better, but I felt the pricing was excellent for what was offered."

                : "The product quality could be better, but the pricing was great considering what was offered."

        );

    }

    else {

        addSentence(
            parts,
            "quality"
        );

    }


    /* PRICING + QUALITY */

    if (

        ratings.pricing === "Poor" &&

        (
            ratings.quality === "Great" ||
            ratings.quality === "Excellent"
        )

    ) {

        parts.push(

            ratings.quality === "Excellent"

                ? "The product quality was excellent, although I felt the pricing could be more competitive."

                : "The product quality was great, although the pricing could be improved."

        );

    }

    else if (
        ratings.pricing !== "Poor"
    ) {

        addSentence(
            parts,
            "pricing"
        );

    }


    /* COLLECTION + VARIETY */

    if (

        ratings.collection === "Excellent" &&

        ratings.variety === "Poor"

    ) {

        parts.push(
            "The collection itself was excellent, although I felt there could have been more variety."
        );

    }

    else {

        addSentence(
            parts,
            "collection"
        );


        addSentence(
            parts,
            "variety"
        );

    }


    /* QUALITY + FITTING */

    if (

        ratings.quality === "Excellent" &&

        ratings.fitting === "Poor"

    ) {

        parts.push(
            "The product quality was excellent, although I felt the fitting could have been better."
        );

    }

    else {

        addSentence(
            parts,
            "fitting"
        );

    }


    /* OTHER CATEGORIES */

    addSentence(
        parts,
        "staff"
    );


    addSentence(
        parts,
        "ambience"
    );


    addSentence(
        parts,
        "overall"
    );


    /* REMOVE DUPLICATES */

    parts =
        [...new Set(parts)];


    /* RANDOM ORDER */

    shuffle(parts);


    /* KEEP REVIEW NATURAL */

    parts =
        parts.slice(
            0,
            Math.min(
                parts.length,
                5
            )
        );


    return (
        `${opening} ${parts.join(" ")}`
    );

}


/* =========================================
   ADD SENTENCE
   ========================================= */

function addSentence(
    array,
    category
) {

    if (
        !ratings[category]
    ) {

        return;

    }


    const options =
        data[category]?.[
            ratings[category]
        ];


    if (
        options &&
        options.length
    ) {

        array.push(
            random(options)
        );

    }

}


/* =========================================
   RANDOM ITEM
   ========================================= */

function random(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* =========================================
   SHUFFLE
   ========================================= */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


/* =========================================
   SCREEN CONTROL
   ========================================= */

function showStep(step) {

    screens.forEach(
        (screen, index) => {

            screen.classList.toggle(
                "active",
                index === step - 1
            );

        }
    );


    updateProgress(step);

}


/* =========================================
   PROGRESS
   ========================================= */

function updateProgress(step) {

    dots.forEach(
        (dot, index) => {

            dot.classList.remove(
                "active",
                "done"
            );


            if (
                index < step - 1
            ) {

                dot.classList.add(
                    "done"
                );


                dot.textContent =
                    "✓";

            }


            else if (
                index === step - 1
            ) {

                dot.classList.add(
                    "active"
                );


                dot.textContent =
                    index + 1;

            }


            else {

                dot.textContent =
                    index + 1;

            }

        }
    );


    lines.forEach(
        (line, index) => {

            line.classList.toggle(
                "done",
                index < step - 1
            );

        }
    );

}


/* =========================================
   COPY REVIEW
   ========================================= */

copy.addEventListener(
    "click",
    async () => {

        const text =
            review.textContent.trim();


        if (!text) {

            return;

        }


        try {

            await navigator.clipboard
                .writeText(text);

        }

        catch {

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            document.body.appendChild(
                textarea
            );


            textarea.select();


            document.execCommand(
                "copy"
            );


            textarea.remove();

        }


        showStatus(
            "Review copied ✓"
        );

    }
);


/* =========================================
   GOOGLE REVIEW
   ========================================= */

google.addEventListener(
    "click",
    () => {

        window.location.href =
            GOOGLE_REVIEW_URL;

    }
);


/* =========================================
   RESTART
   ========================================= */

restart.addEventListener(
    "click",
    () => {

        selected = [];

        ratings = {};


        categoryButtons.forEach(
            button => {

                button.classList.remove(
                    "selected"
                );

            }
        );


        next.disabled =
            true;


        ratingsBox.innerHTML =
            "";


        review.textContent =
            "";


        status.textContent =
            "";


        showStep(1);

    }
);


/* =========================================
   STATUS
   ========================================= */

function showStatus(message) {

    status.textContent =
        message;


    clearTimeout(
        window.statusTimer
    );


    window.statusTimer =
        setTimeout(
            () => {

                status.textContent =
                    "";

            },
            2500
        );

}


/* =========================================
   INITIALIZE
   ========================================= */

showStep(1);

next.disabled = true;