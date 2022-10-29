window.addEventListener("load", function () {
    (async ()=>
    {
        const
            interval       = 1000  // ms
            , paddingRight   = 50
            , slidesWrapper  = document.querySelector('.carousel-slides')
            , slides         = document.querySelectorAll('.carousel-slides > li')
            , delay          = ms => new Promise(r => setTimeout(r, ms))
            , movLeft = (el, mov) => new Promise(r =>
            {
                el.ontransitionend =_=>
                {
                    el.ontransitionend = null
                    el.style.transition = 'none';
                    r()
                }
                el.style.transition = '1s';
                el.style.transform  = `translateX(${-mov}px)`;
            });

        let index = 0;

        while (true) // infinite carrousel loop
        {
            await delay( interval )
            await movLeft( slidesWrapper, slides[index].clientWidth + paddingRight  )

            slidesWrapper.appendChild( slides[index] )  // mov first slide to the end
            slidesWrapper.style.transform    = `translateX(0)` // rest translateX
            index = ++index % slides.length
        }
    })()
});