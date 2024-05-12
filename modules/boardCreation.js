
const generateBoard = (seed, size) => {
    setSeed(seed);

    const letterChances = {
        "a": 8.167,    
        "b": 9.6589,   
        "c": 12.4409,  
        "d": 16.694,   
        "e": 29.396,   
        "f": 31.624,   
        "g": 33.639,   
        "h": 39.733,   
        "i": 46.699,   
        "j": 46.852,   
        "k": 47.624,   
        "l": 51.649,   
        "m": 54.055,   
        "n": 60.804,   
        "o": 68.311,   
        "p": 70.24,    
        "q": 70.335,   
        "r": 76.322,   
        "s": 82.649,   
        "t": 91.705,   
        "u": 94.4629,  
        "v": 95.4409,  
        "w": 97.8009,  
        "x": 97.9509,  
        "y": 99.925,   
        "z": 100.0     
    }

    let result = "";
    let vowelCount = 0;
    const lowestVowelCount = size;

    // change this maybe
    const highestVowelCount = Math.floor(0.25 * size * size + 2.99);
    const desiredVowelCount = Math.round(Math.random() * (highestVowelCount - lowestVowelCount) + lowestVowelCount);
    const letterFrequency = {};

    // change this maybe
    const allowedDuplicates = Math.ceil(1.5 * Math.sqrt(size) - 1);
    //console.log(desiredVowelCount);
    //console.log(allowedDuplicates);

    // Generates a completely random board.
    for (let i = 0; i < (size * size); i++) {
        const letter = getRandomLetter(letterChances);

        // Check if it's a vowel
        if ("aeiou".includes(letter))
            vowelCount++;

        result += letter;
        letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
    }

    //console.log(vowelCount);
    //console.log(result);

    // Removes/adds a certain amount of vowels.
    while (vowelCount !== desiredVowelCount) {
        const randomIndex = Math.floor(Math.random() * 16);
        let randomLetter = result[randomIndex];

        if (vowelCount < desiredVowelCount) {
            if ("aeiou".includes(randomLetter))
                continue;

            letterFrequency[randomLetter]--;

            while (!"aeiou".includes(randomLetter))
                randomLetter = getRandomLetter(letterChances);

            vowelCount++;
        } else {
            if ("bcdfghjklmnpqrstvwxyz".includes(randomLetter))
                continue;

            letterFrequency[randomLetter]--;

            while (!"bcdfghjklmnpqrstvwxyz".includes(randomLetter))
                randomLetter = getRandomLetter(letterChances);

            vowelCount--;
        }

        letterFrequency[randomLetter] = (letterFrequency[randomLetter] || 0) + 1;
        result = result.substring(0, randomIndex) + randomLetter + result.substring(randomIndex + 1); 
    }

    //console.log(JSON.stringify(letterFrequency));
    // Adjust board to remove illegal duplicates.
    for (const letter in letterFrequency) {
        let amount = letterFrequency[letter];
        if (amount <= allowedDuplicates)
            continue;

        while (amount > allowedDuplicates) {
            let index;
            while (result[index] !== letter)
                index = Math.floor(Math.random() * 16);

            //console.log(index);
            let newLetter = letter;

            if ("aeiou".includes(letter))
                while (letterFrequency[newLetter] >= allowedDuplicates || !"aeiou".includes(newLetter))
                    newLetter = getRandomLetter(letterChances);
            else 
                while (letterFrequency[newLetter] >= allowedDuplicates || !"bcdfghjklmnpqrstvwxyz".includes(newLetter))
                    newLetter = getRandomLetter(letterChances);

            letterFrequency[newLetter] = (letterFrequency[newLetter] || 0) + 1;
            letterFrequency[letter]--;
            amount--;

            result = result.substring(0, index) + newLetter + result.substring(index + 1); 
        }
    }

    //console.log(letterFrequency);
    //console.log(result);

    return result;
}

// Gets a random letter from the letter table.
function getRandomLetter(letterChances) {
    const value = Math.random() * 100;
    for (const letter in letterChances) {
        if (value < letterChances[letter])
            return letter;
    }
}

// Sets the "seed" to make Math.random() return the same value every time.
function setSeed(seed) {
    !function(f,a,c){var s,l=256,p="random",d=c.pow(l,6),g=c.pow(2,52),y=2*g,h=l-1;function n(n,t,r){function e(){for(var n=u.g(6),t=d,r=0;n<g;)n=(n+r)*l,t*=l,r=u.g(1);for(;y<=n;)n/=2,t/=2,r>>>=1;return(n+r)/t}var o=[],i=j(function n(t,r){var e,o=[],i=typeof t;if(r&&"object"==i)for(e in t)try{o.push(n(t[e],r-1))}catch(n){}return o.length?o:"string"==i?t:t+"\0"}((t=1==t?{entropy:!0}:t||{}).entropy?[n,S(a)]:null==n?function(){try{var n;return s&&(n=s.randomBytes)?n=n(l):(n=new Uint8Array(l),(f.crypto||f.msCrypto).getRandomValues(n)),S(n)}catch(n){var t=f.navigator,r=t&&t.plugins;return[+new Date,f,r,f.screen,S(a)]}}():n,3),o),u=new m(o);return e.int32=function(){return 0|u.g(4)},e.quick=function(){return u.g(4)/4294967296},e.double=e,j(S(u.S),a),(t.pass||r||function(n,t,r,e){return e&&(e.S&&v(e,u),n.state=function(){return v(u,{})}),r?(c[p]=n,t):n})(e,i,"global"in t?t.global:this==c,t.state)}function m(n){var t,r=n.length,u=this,e=0,o=u.i=u.j=0,i=u.S=[];for(r||(n=[r++]);e<l;)i[e]=e++;for(e=0;e<l;e++)i[e]=i[o=h&o+n[e%r]+(t=i[e])],i[o]=t;(u.g=function(n){for(var t,r=0,e=u.i,o=u.j,i=u.S;n--;)t=i[e=h&e+1],r=r*l+i[h&(i[e]=i[o=h&o+t])+(i[o]=t)];return u.i=e,u.j=o,r})(l)}function v(n,t){return t.i=n.i,t.j=n.j,t.S=n.S.slice(),t}function j(n,t){for(var r,e=n+"",o=0;o<e.length;)t[h&o]=h&(r^=19*t[h&o])+e.charCodeAt(o++);return S(t)}function S(n){return String.fromCharCode.apply(0,n)}if(j(c.random(),a),"object"==typeof module&&module.exports){module.exports=n;try{s=require("crypto")}catch(n){}}else"function"==typeof define&&define.amd?define(function(){return n}):c["seed"+p]=n}("undefined"!=typeof self?self:this,[],Math);

    Math.seedrandom(seed);
}


export { generateBoard };
