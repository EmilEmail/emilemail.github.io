# Beer Project
## Instruktioner
Utse en gruppledare som forkar det här repot och bjuder in de andra som collaborators.

## Punk API
Ni ska bygga en öl-wiki som använder sig av data från Punk API:et (https://punkapi.com/documentation/v2). Hemsidan ska bestå av tre olika vyer (sidor)(se nedan för information om de olika sidorna). Förutom de krav som specificeras nedan har ni fria händer (exempelvis gällande design).

## Kravspecifikation

### G-krav
#### Landing Page (Random beer)
* Användaren ska kunna slumpa fram en öl genom att trycka på en knapp exempelvis.
* Namnet och bilden på den slumpade ölen ska man se i ett “card” (se nedan för exempel).

![alt text](https://github.com/niklaszocom/beer-project/blob/main/Namnl%C3%B6s.jpg)

* Användaren ska kunna trycka på "See More" för att komma till "Beer Info Page" (Se längre ner för info).


#### Search Page
* Användare ska kunna söka på en öl med hjälp av dess namn.
* Sidan ska använda sig av ett formulär.
* Resultatet av sökningen ska visas i en lista (endast namnen på ölen). 
* Listan får innehålla max 10 resultat. Om fler än 10 sökresultat finns ska listan vara paginerad.


#### Beer Info Page
* Denna sida ska bara gå att vi någon av de sidorna som beskrivs ovan.
* På denna sida ska användaren kunna få detaljerad information om en specifik öl.
* Sidan ska minst innehålla:
    * Description
    * Image
    * Alcohol by volume 
    * Volume
    * Ingredients
    * Hops 
    * Food pairing
    * Brewers tips

### Bonus (VG-krav)

#### Search Page
* Användare ska kunna göra avancerade sökningar.
* En användare ska kunna söka på en av dessa eller en kombination av dessa kriterier:
    * Name
    * Hops
    * Malt
    * Brewed Before & Brewed After
    * ABV Greater Than & ABV Less Than
* Sökformuläret ska inkludera relevant validering
* Sidan ska cachea tidigare besökta sidor av sökresultat. Dvs om man går från sida 1 till sida 2 och sen tillbaka till sida 1 i sökresultaten ska inte ytterligare request ske.
