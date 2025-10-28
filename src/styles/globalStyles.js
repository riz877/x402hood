import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--primary);
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  /* DIUBAH: Menambahkan efek scan lines ala monitor CRT (Matrix) */
  position: relative;
  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Membuat garis-garis horizontal tipis */
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0px,
      rgba(0, 0, 0, 0.4) 1px,
      transparent 1px,
      transparent 3px
    );
    z-index: 1; /* Overlay di atas background */
    pointer-events: none; /* Tidak bisa diklik */
    
    /* DIUBAH: Mengaplikasikan animasi crtFlicker */
    opacity: 0.6; /* Opacity dasar */
    animation: crtFlicker 0.1s infinite steps(1);
  }

  /* Memastikan konten (anak-anak dari Screen) tampil di atas scan lines */
  & > * {
    z-index: 2;
  }
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const TextTitle = styled.p`
  color: var(--primary-text);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.6;
  /* DIUBAH: Menambahkan efek glow matrix */
  text-shadow: var(--matrix-glow);
`;

export const TextSubTitle = styled.p`
  color: var(--primary-text);
  font-size: 18px;
  line-height: 1.6;
  /* DIUBAH: Menambahkan efek glow matrix */
  text-shadow: var(--matrix-glow);
`;

export const TextDescription = styled.p`
  color: var(--primary-text);
  font-size: 16px;
  line-height: 1.6;
  /* DIUBAH: Menambahkan efek glow matrix */
  text-shadow: var(--matrix-glow);
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;

/* DIUBAH: Menambahkan container untuk social media */
export const SocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 24px; /* Memberi jarak antar link */
`;