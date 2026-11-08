import styled, { css, keyframes } from "styled-components";

const STEPS_PENDING = "#f5a623";
// "Bien" (2/3): verde suave de la paleta, positivo pero sin el rayado de "Perfecto".
const PARTIAL = "rgba(21, 193, 146, 0.28)";
const PARTIAL_BORDER = "#6cc9ab";
const MISSED_BG = "rgba(234, 62, 109, 0.14)";

const stripes = css`
  background-image:
    linear-gradient(20deg, rgba(255, 255, 255, 0.12) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.12) 75%, transparent 75%, transparent),
    linear-gradient(20deg, rgba(255, 255, 255, 0.12) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.12) 75%, transparent 75%, transparent);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
`;

const hardBorder = css`
  border: 3px solid #42414f;
  border-top: 0px;
  border-left: 0px;
  border-radius: 2px;
`;

const stampSlam = keyframes`
  0%   { opacity: 0; transform: translate(-50%, -50%) rotateZ(-14deg) scale(3.2); }
  22%  { opacity: 1; transform: translate(-50%, -50%) rotateZ(-14deg) scale(0.88); }
  32%  { transform: translate(-50%, -50%) rotateZ(-14deg) scale(1.06); }
  40%  { transform: translate(-50%, -50%) rotateZ(-14deg) scale(1); }
  82%  { opacity: 1; transform: translate(-50%, -50%) rotateZ(-14deg) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) rotateZ(-14deg) scale(0.6); }
`;

const shine = keyframes`
  0%, 35% { transform: translateX(-120%) skewX(-20deg); }
  60%, 100% { transform: translateX(220%) skewX(-20deg); }
`;

const shake = keyframes`
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-5px, 3px) rotateZ(-0.6deg); }
  40% { transform: translate(5px, -2px) rotateZ(0.6deg); }
  60% { transform: translate(-3px, 2px); }
  80% { transform: translate(2px, -1px); }
`;

const flash = keyframes`
  0%, 18% { opacity: 0; }
  24% { opacity: 0.85; }
  100% { opacity: 0; }
`;

const fly = keyframes`
  0%, 18% { opacity: 0; transform: rotate(var(--a)) translateY(0) scale(0.4); }
  26% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; transform: rotate(var(--a)) translateY(calc(-1 * var(--d))) scale(1); }
`;

const goodPop = keyframes`
  0%   { opacity: 0; transform: scale(0); }
  60%  { opacity: 1; transform: scale(1.2); }
  80%  { transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(234, 62, 109, 0.0), inset 0 0 0 2px rgba(234, 62, 109, 0.9); }
  50%      { box-shadow: 0 0 14px 2px rgba(234, 62, 109, 0.45), inset 0 0 0 2px rgba(234, 62, 109, 0.9); }
`;

const meterShine = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(380%); }
`;

const flagPop = keyframes`
  0%   { transform: translateX(-50%) scale(1); }
  40%  { transform: translateX(-50%) scale(1.35); }
  100% { transform: translateX(-50%) scale(1); }
`;

const pop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.12); }
  100% { transform: scale(1); }
`;

export const ProgressWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .screen-content {
    padding-bottom: 16px;
    min-width: 0;
    min-height: 0;
  }

  .goal,
  .cell {
    min-width: 0;
    box-sizing: border-box;
  }

  section {
    margin-bottom: 22px;
  }

  h3 {
    font-size: 30px;
  }

  .digits {
    font-family: "dsDigi", monospace;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Racha: marcador */
  .streak {
    margin-bottom: 14px;
    padding: 10px 12px 8px;
    background: rgb(207 217 223 / 80%);
    ${hardBorder}

    .streak-top {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .scoreboard {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px 2px 6px;
      background: ${({ theme }) => theme.colors.dark};
      ${hardBorder}
      border-color: ${({ theme }) => theme.colors.primary};
    }
    .fire {
      font-size: 22px;
      transform: rotateZ(-10deg);
      display: inline-block;
    }
    .scoreboard .digits {
      font-size: 40px;
      line-height: 1;
      color: ${({ theme }) => theme.colors.primary};
      text-shadow: 0 0 8px rgba(21, 193, 146, 0.45);
    }
    .streak-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      line-height: 1.05;
      .title {
        font-family: "wildWolf", sans-serif;
        font-size: 24px;
      }
      .label {
        font-size: 13px;
        color: #55545f;
      }
    }
    .best {
      align-self: flex-start;
      background: ${({ theme }) => theme.colors.primary_inverse};
      color: white;
      font-size: 12px;
      padding: 1px 8px;
      transform: rotateZ(4deg);
      white-space: nowrap;
      b {
        font-size: 15px;
        font-weight: 400;
        margin-left: 2px;
      }
    }

    &.cold {
      .fire {
        filter: grayscale(1);
        opacity: 0.5;
      }
      .scoreboard .digits {
        color: #6d6d73;
        text-shadow: none;
      }
      .scoreboard {
        border-color: #6d6d73;
      }
    }

  }

  /* Hoy: footer fijo (fuera del área con scroll) */
  .today.footer {
    position: relative;
    flex-shrink: 0;
    margin: 6px 14px 12px;
    /* Por si el móvil dibuja la navegación encima del contenido */
    margin-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    padding: 8px 10px 10px;
    background: rgb(207 217 223 / 96%);
    ${hardBorder}
    box-shadow: 0 -6px 14px rgba(0, 0, 0, 0.08);
    z-index: 5;

    .today-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      h3 {
        font-size: 22px;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }
  }

  .goals {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .goal {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 7px 4px;
    background: #f2f5f7;
    color: ${({ theme }) => theme.colors.dark};
    ${hardBorder}
    transition: background-color 0.2s;

    .goal-title {
      font-family: "wildWolf", sans-serif;
      font-size: 15px;
      line-height: 1.1;
      max-width: 100%;
      overflow-wrap: anywhere;
    }
    .done-badge {
      position: absolute;
      top: 3px;
      right: 5px;
      font-size: 13px;
      color: white;
    }
    .goal-value {
      font-weight: 500;
      font-size: 15px;
      min-height: 24px;
      line-height: 24px;
    }

    &.done {
      background-color: ${({ theme }) => theme.colors.primary};
      ${stripes}
      color: white;
      animation: ${pop} 0.3s ease-out;
    }

    &.routine {
      cursor: pointer;
      &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.dark};
        outline-offset: 2px;
      }
    }
    /* Selector de rutina: texto con flechita, sin aspecto de formulario */
    .routine-select {
      max-width: 100%;
      height: 24px;
      padding: 0 14px 0 4px;
      border: none;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.06);
      background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
        linear-gradient(135deg, currentColor 50%, transparent 50%);
      background-position: calc(100% - 8px) 10px, calc(100% - 4px) 10px;
      background-size: 4px 4px;
      background-repeat: no-repeat;
      color: inherit;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      option {
        color: ${({ theme }) => theme.colors.dark};
      }
    }
    &.done .routine-select {
      background-color: rgba(255, 255, 255, 0.22);
    }

    /* Pasos: número y barra fusionados en una píldora que se rellena */
    &.steps {
      .meter {
        position: relative;
        width: 92%;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${({ theme }) => theme.colors.secondary};
        border-radius: 3px;
        overflow: hidden;
      }
      .meter-fill {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        /* Naranja mientras no se llega al objetivo */
        background: ${STEPS_PENDING};
        transition: width 0.3s, background-color 0.3s;
      }
      .goal-value.digits,
      input.goal-value {
        position: relative;
        z-index: 1;
        font-family: "dsDigi", monospace;
        font-size: 21px;
        font-weight: 400;
        line-height: 24px;
        min-height: 0;
      }
      input.goal-value {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        color: inherit;
        text-align: center;
        padding: 0;
        outline: none;
      }
      &.editing {
        outline: 2px solid ${({ theme }) => theme.colors.primary_inverse};
        outline-offset: 2px;
      }
      &.done .meter {
        background: rgba(255, 255, 255, 0.25);
      }
      &.done .meter-fill {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }


  /* Etiqueta del día (Bien / Perfecto), recta, a la derecha del título */
  .stamp {
    font-family: "wildWolf", sans-serif;
    font-size: 18px;
    line-height: 1.2;
    border: 2px solid currentColor;
    border-radius: 3px;
    padding: 0 8px;
    background: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    pointer-events: none;
  }
  /* 2/3: bien, discreto */
  .stamp.good {
    color: #3fa585;
    &.animate {
      animation: ${goodPop} 0.5s cubic-bezier(0.2, 0.8, 0.3, 1.2) both;
    }
  }
  /* 3/3: perfecto */
  .stamp.perfect {
    color: ${({ theme }) => theme.colors.primary_inverse};
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.9), inset 0 0 0 3px currentColor;
    &.delayed {
      animation: ${fadeIn} 0.35s ease-out 2.2s both;
    }
  }

  /* Celebración de "Perfecto" */
  .today.celebrate {
    animation: ${shake} 0.4s ease-out 0.5s;
  }
  .flash {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 70%);
    pointer-events: none;
    z-index: 4;
    animation: ${flash} 1.2s ease-out forwards;
  }
  .stamp-big {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5;
    pointer-events: none;
    font-family: "wildWolf", sans-serif;
    font-size: 50px;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.primary_inverse};
    border: 5px solid currentColor;
    box-shadow:
      inset 0 0 0 3px rgba(255, 255, 255, 0.95),
      inset 0 0 0 6px currentColor,
      6px 6px 0 rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 4px 22px;
    background: rgba(255, 255, 255, 0.85);
    overflow: hidden;
    opacity: 0;
    animation: ${stampSlam} 2.4s cubic-bezier(0.2, 0.8, 0.3, 1.1) forwards;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 40%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
      animation: ${shine} 2.4s ease-in-out forwards;
    }
  }
  .burst {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    z-index: 4;
    pointer-events: none;
    i {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      animation: ${fly} 1.6s cubic-bezier(0.1, 0.7, 0.3, 1) forwards;
      &.dot {
        width: 9px;
        height: 9px;
        margin: -4px 0 0 -4px;
        border-radius: 50%;
      }
      &.star::before {
        content: "★";
        position: absolute;
        font-size: 20px;
        line-height: 1;
        transform: translate(-50%, -50%);
      }
      &.green { color: ${({ theme }) => theme.colors.primary}; }
      &.pink { color: ${({ theme }) => theme.colors.primary_inverse}; }
      &.orange { color: ${STEPS_PENDING}; }
      &.dot.pink { background: ${({ theme }) => theme.colors.primary_inverse}; }
      &.dot.orange { background: ${STEPS_PENDING}; }
    }
  }

  /* Iconos de las fichas: SVG como máscara CSS, heredan el color del texto */
  .icon {
    display: block;
    width: 28px;
    height: 28px;
    background: currentColor;
    -webkit-mask: var(--icon) center / contain no-repeat;
    mask: var(--icon) center / contain no-repeat;
  }
  .goal:not(.done) .icon {
    color: ${({ theme }) => theme.colors.primary};
  }
  .icon-dumbbell {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='1' y='9' width='2.6' height='6' rx='1'/%3E%3Crect x='4.2' y='5.5' width='3.6' height='13' rx='1.2'/%3E%3Crect x='7.6' y='10.6' width='8.8' height='2.8' rx='1'/%3E%3Crect x='16.2' y='5.5' width='3.6' height='13' rx='1.2'/%3E%3Crect x='20.4' y='9' width='2.6' height='6' rx='1'/%3E%3C/svg%3E");
  }
  .icon-stretch {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='4.2' r='2.3'/%3E%3Cg fill='none' stroke='black' stroke-width='2.3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5.5 1.8 9.8 8.4M18.5 1.8 14.2 8.4'/%3E%3Cpath d='M12 14.6 8.3 22M12 14.6l3.7 7.4'/%3E%3C/g%3E%3Cpath d='M9.4 7.6h5.2l-.9 7.4h-3.4z'/%3E%3C/svg%3E");
  }
  .icon-steps {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg transform='translate%280 -1%29'%3E%3Cpath fill-rule='evenodd' d='M1.5 15.6V8.2c0-.8.6-1.4 1.4-1.4h2.9c.6 0 1.1.4 1.3.9l.5 1.3c.3.8 1.2 1.1 1.9.6l1.6-1.1 7.4 3.6c2.5.7 4 2 4 3.5zM10.9 10.3l1.4-.9.6.8-1.4.9zM12.9 11.3l1.4-.9.6.8-1.4.9zM14.9 12.3l1.4-.9.6.8-1.4.9z'/%3E%3Crect x='1.5' y='16.6' width='21' height='2.8' rx='1.4'/%3E%3C/g%3E%3C/svg%3E");
  }

  /* Calendario */
  .calendar {
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      h3 small {
        font-family: "dsDigi", monospace;
        font-size: 22px;
      }
      button {
        background: none;
        border: none;
        font-size: 20px;
        color: ${({ theme }) => theme.colors.primary};
        &:disabled {
          color: #b5b5b5;
          cursor: default;
        }
      }
    }
    .weekdays,
    .grid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 6px;
    }
    .weekdays span {
      text-align: center;
      font-family: "wildWolf", sans-serif;
      font-size: 18px;
    }
    .grid {
      margin-top: 4px;
    }

    .cell {
      position: relative;
      aspect-ratio: 1;
      padding: 0;
      background: #f2f5f7;
      color: ${({ theme }) => theme.colors.dark};
      border: 2px solid transparent;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      &.empty {
        background: none;
      }
      .num {
        margin-top: 3px;
        font-family: "dsDigi", monospace;
        font-size: 18px;
      }
      .zone {
        width: 15px;
        height: 15px;
        opacity: 0.85;
      }
      .star {
        position: absolute;
        top: 0px;
        right: 2px;
        font-size: 11px;
        color: ${({ theme }) => theme.colors.primary_inverse};
      }
      .segments {
        display: flex;
        gap: 2px;
        width: 80%;
        margin-bottom: 4px;
        i {
          flex: 1;
          height: 5px;
          border-radius: 1px;
          background: ${({ theme }) => theme.colors.secondary};
          &.on {
            background: ${({ theme }) => theme.colors.primary};
          }
        }
      }

      &.future {
        opacity: 0.45;
        cursor: default;
      }
      /* Antes de empezar a registrar: neutro (se puede tocar para rellenarlo) */
      &.before-start {
        opacity: 0.6;
      }
      /* Fin de semana sin completar: neutro, nunca fallo */
      &.rest-day {
        background: repeating-linear-gradient(
          45deg,
          #eef1f3 0 6px,
          #e4e8eb 6px 12px
        );
        color: #8a8a8a;
      }
      /* 3/3: perfecto */
      &.complete {
        background-color: ${({ theme }) => theme.colors.primary};
        ${stripes}
        ${hardBorder}
        color: white;
        .segments i,
        .segments i.on {
          background: rgba(255, 255, 255, 0.85);
        }
        .star {
          color: white;
        }
      }
      /* 2/3: bien */
      &.partial {
        background-color: ${PARTIAL};
        ${hardBorder}
        border-color: ${PARTIAL_BORDER};
        color: ${({ theme }) => theme.colors.dark};
        .segments i {
          background: rgba(255, 255, 255, 0.55);
          &.on {
            background: ${({ theme }) => theme.colors.primary};
          }
        }
      }
      /* 0-1/3: fallado */
      &.missed {
        background: ${MISSED_BG};
        color: ${({ theme }) => theme.colors.primary_inverse};
        .num {
          opacity: 0.6;
        }
        .segments i {
          background: rgba(234, 62, 109, 0.25);
          &.on {
            background: ${({ theme }) => theme.colors.primary_inverse};
          }
        }
      }
      &.today {
        border-color: ${({ theme }) => theme.colors.primary_inverse};
      }
      &.selected {
        outline: 2px dashed ${({ theme }) => theme.colors.dark};
        outline-offset: 1px;
      }
      /* Fallado con 1 objetivo: fondo naranja; la barrita hecha en verde (o naranja si fue estiramiento) */
      &.missed.one {
        background: rgba(245, 166, 35, 0.22);
        color: #b9761a;
        .segments i {
          background: rgba(185, 118, 26, 0.2);
          &.on {
            background: ${({ theme }) => theme.colors.primary};
          }
        }
      }
      /* Día con sólo estiramiento: su barrita en naranja (va al final para ganar a los estados) */
      .segments i.on.solo,
      &.missed .segments i.on.solo,
      &.rest-day .segments i.on.solo {
        background: ${STEPS_PENDING};
      }
    }

  }

  /* Barra de objetivos semanal: una casilla por objetivo, iconos de recompensa en su hito */
  .goals-track {
    margin: 0 0 12px;
    padding-top: 30px; /* sitio para los iconos de recompensa */
  }
  /* Barra continua con relleno rayado animado (brillo que la recorre) */
  .goals-meter {
    position: relative;
    height: 18px;
    background: ${({ theme }) => theme.colors.secondary};
    ${hardBorder}
    .goals-fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      background-color: ${({ theme }) => theme.colors.primary_inverse};
      ${stripes}
      transition: width 0.6s ease-out;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 30%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
        animation: ${meterShine} 2.4s ease-in-out infinite;
      }
    }
    /* Banderín de cada recompensa: línea en la barra + icono encima */
    .tick {
      position: absolute;
      top: -6px;
      bottom: -3px;
      width: 2px;
      margin-left: -1px;
      background: #8d8c95;
      z-index: 1;
      color: #8d8c95;
      .reward-icon {
        position: absolute;
        bottom: 100%;
        left: 50%;
        width: 22px;
        height: 22px;
        margin-bottom: 2px;
        transform: translateX(-50%);
        background: currentColor;
        -webkit-mask: var(--icon) center / contain no-repeat;
        mask: var(--icon) center / contain no-repeat;
      }
      &.reached {
        background: ${({ theme }) => theme.colors.primary_inverse};
        color: ${({ theme }) => theme.colors.primary_inverse};
        .reward-icon {
          animation: ${flagPop} 0.6s ease-out;
        }
      }
    }
    &.all .goals-fill {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
  .icon-lips {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M12 8.2c-1-1.5-2.4-2.3-3.6-2.3-1.3 0-2.6.9-4 1.9-1.3.9-2.5 1.9-3.4 2.4 1.6 2.7 5.3 7.9 11 7.9s9.4-5.2 11-7.9c-.9-.5-2.1-1.5-3.4-2.4-1.4-1-2.7-1.9-4-1.9-1.2 0-2.6.8-3.6 2.3zM3.6 10.4c2.6.9 5.4 1.3 8.4 1.3s5.8-.4 8.4-1.3c-2.6.5-5.4.8-8.4.8s-5.8-.3-8.4-.8z'/%3E%3C/svg%3E");
  }
  .icon-burger {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10.2C3 6.3 7 3.5 12 3.5s9 2.8 9 6.7c0 .5-.4.8-.9.8H3.9c-.5 0-.9-.3-.9-.8z'/%3E%3Cpath d='M2.5 12.6h19c.6 0 .8.8.3 1.1l-2.1 1.2-2.4-1-2.6 1.2-2.7-1.2-2.7 1.2-2.6-1.2-2.4 1-2.1-1.2c-.5-.3-.3-1.1.3-1.1z'/%3E%3Cpath d='M3.5 16.2h17v1.6c0 1.6-1.3 2.7-2.9 2.7H6.4c-1.6 0-2.9-1.1-2.9-2.7z'/%3E%3C/svg%3E");
  }

  /* Recompensas de la semana */
  .rewards {
    .rewards-title {
      font-size: 32px;
      margin-bottom: 2px;
    }


    .reward-msg {
      font-size: 13px;
      font-weight: 500;
      color: #55545f;
      margin-bottom: 10px;
    }
    .reward-msg.great {
      color: #0e9a74;
    }
    .reward-msg.lost {
      color: #8d8c95;
      font-style: italic;
    }

    .reward-cards {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .reward-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      flex-direction: row;
      justify-content: center;
      gap: 8px;
      min-height: 0;
      height: 40px;
      padding: 0 6px;

      .reward-pct {
        font-size: 22px;
        line-height: 1;
      }
      background: #f2f5f7;
      color: ${({ theme }) => theme.colors.dark};
      ${hardBorder}
      text-align: center;
      font: inherit;

      .claimed-badge {
        position: absolute;
        top: 2px;
        right: 6px;
        font-size: 12px;
        color: white;
      }

      .reward-icon {
        width: 22px;
        height: 22px;
        background: currentColor;
        -webkit-mask: var(--icon) center / contain no-repeat;
        mask: var(--icon) center / contain no-repeat;
      }
      .reward-title {
        font-family: "wildWolf", sans-serif;
        font-size: 20px;
        line-height: 1.1;
      }
      .reward-sub {
        font-size: 12px;
        color: #6b6a74;
      }
      .reward-state {
        margin-top: 6px;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #8a8a8a;
      }
      .claim {
        margin-top: 8px;
        padding: 3px 14px;
        border: none;
        background: ${({ theme }) => theme.colors.primary_inverse};
        color: white;
        font-family: "wildWolf", sans-serif;
        font-size: 16px;
        ${hardBorder}
        border-color: #9e2448;
        &.done {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.6);
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
        }
      }

      /* Bloqueada: apagada, con candado */
      &.locked {
        background: #e4e8eb;
        border-style: dashed;
        color: #8d8c95;
        .reward-icon {
          opacity: 0.45;
        }
        .lock {
          position: absolute;
          top: 4px;
          right: 5px;
          width: 11px;
          height: 11px;
          background: #8d8c95;
          -webkit-mask: var(--icon) center / contain no-repeat;
          mask: var(--icon) center / contain no-repeat;
          --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M7 10V7.5a5 5 0 0 1 10 0V10h.5c1 0 1.8.8 1.8 1.8v8c0 1-.8 1.7-1.8 1.7h-11c-1 0-1.8-.7-1.8-1.7v-8c0-1 .8-1.8 1.8-1.8zm2.4 0h5.2V7.5a2.6 2.6 0 0 0-5.2 0zM12 14a1.6 1.6 0 0 0-.8 3v1.6h1.6V17a1.6 1.6 0 0 0-.8-3z'/%3E%3C/svg%3E");
        }
      }
      /* Lista para canjear: brilla */
      &.ready {
        cursor: pointer;
        background: #fff;
        animation: ${glow} 1.8s ease-in-out infinite;
        .reward-icon {
          color: ${({ theme }) => theme.colors.primary_inverse};
        }
      }
      /* Canjeada: ficha ganada */
      &.claimed {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.primary};
        ${stripes}
        color: white;
        .reward-sub {
          color: rgba(255, 255, 255, 0.85);
        }
      }
    }
    .reward-icon {
      display: block;
      background: currentColor;
      -webkit-mask: var(--icon) center / contain no-repeat;
      mask: var(--icon) center / contain no-repeat;
    }
    .icon-lips {
      --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M12 8.2c-1-1.5-2.4-2.3-3.6-2.3-1.3 0-2.6.9-4 1.9-1.3.9-2.5 1.9-3.4 2.4 1.6 2.7 5.3 7.9 11 7.9s9.4-5.2 11-7.9c-.9-.5-2.1-1.5-3.4-2.4-1.4-1-2.7-1.9-4-1.9-1.2 0-2.6.8-3.6 2.3zM3.6 10.4c2.6.9 5.4 1.3 8.4 1.3s5.8-.4 8.4-1.3c-2.6.5-5.4.8-8.4.8s-5.8-.3-8.4-.8z'/%3E%3C/svg%3E");
    }
    .icon-burger {
      --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10.2C3 6.3 7 3.5 12 3.5s9 2.8 9 6.7c0 .5-.4.8-.9.8H3.9c-.5 0-.9-.3-.9-.8z'/%3E%3Cpath d='M2.5 12.6h19c.6 0 .8.8.3 1.1l-2.1 1.2-2.4-1-2.6 1.2-2.7-1.2-2.7 1.2-2.6-1.2-2.4 1-2.1-1.2c-.5-.3-.3-1.1.3-1.1z'/%3E%3Cpath d='M3.5 16.2h17v1.6c0 1.6-1.3 2.7-2.9 2.7H6.4c-1.6 0-2.9-1.1-2.9-2.7z'/%3E%3C/svg%3E");
    }
  }

  /* Iconos de zona del cuerpo (calendario y detalle del mes) */
      .zone {
        background: currentColor;
        -webkit-mask: var(--icon) center / contain no-repeat;
        mask: var(--icon) center / contain no-repeat;
        --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='1' y='9' width='2.6' height='6' rx='1'/%3E%3Crect x='4.2' y='5.5' width='3.6' height='13' rx='1.2'/%3E%3Crect x='7.6' y='10.6' width='8.8' height='2.8' rx='1'/%3E%3Crect x='16.2' y='5.5' width='3.6' height='13' rx='1.2'/%3E%3Crect x='20.4' y='9' width='2.6' height='6' rx='1'/%3E%3C/svg%3E");
      }
      .zone-11 { --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M2.5 6.5c2.4-1.7 6.4-2 9-.7v9.4c-2.8 1.8-6.7 1.6-8.6-.6-1.3-1.6-1.4-6.2-.4-8.1z'/%3E%3Cpath d='M21.5 6.5c-2.4-1.7-6.4-2-9-.7v9.4c2.8 1.8 6.7 1.6 8.6-.6 1.3-1.6 1.4-6.2.4-8.1z'/%3E%3C/svg%3E"); }
      .zone-10 { --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M2.5 4.5h19l-4 9.5-2 6.5h-7l-2-6.5zM11.2 6h1.6v13h-1.6z'/%3E%3C/svg%3E"); }
      .zone-8 { --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M5.5 2h5.6l-.5 9 .8 4-1 7H7.6l.3-7-1.7-4z'/%3E%3Cpath d='M18.5 2h-5.6l.5 9-.8 4 1 7h2.8l-.3-7 1.7-4z'/%3E%3C/svg%3E"); }
      .zone-13 { --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='5' r='3.2'/%3E%3Cpath d='M3 21c0-5.2 3.4-9 7.2-9.4h3.6c3.8.4 7.2 4.2 7.2 9.4z'/%3E%3Ccircle cx='5.6' cy='14.6' r='3.4'/%3E%3Ccircle cx='18.4' cy='14.6' r='3.4'/%3E%3C/svg%3E"); }
      .zone-14,
      .zone-9 { --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='6' y='2.5' width='5.4' height='5.2' rx='1.6'/%3E%3Crect x='12.6' y='2.5' width='5.4' height='5.2' rx='1.6'/%3E%3Crect x='6' y='9.2' width='5.4' height='5.2' rx='1.6'/%3E%3Crect x='12.6' y='9.2' width='5.4' height='5.2' rx='1.6'/%3E%3Crect x='6' y='15.9' width='5.4' height='5.6' rx='1.6'/%3E%3Crect x='12.6' y='15.9' width='5.4' height='5.6' rx='1.6'/%3E%3C/svg%3E"); }

  /* Detalle del mes */
  .detail {
    h3 {
      font-size: 22px;
      margin-bottom: 8px;
    }
    .consistency {
      display: flex;
      flex-direction: column;
      gap: 6px;
      .row {
        display: grid;
        grid-template-columns: 22px 1fr 44px;
        align-items: center;
        gap: 8px;
      }
      .icon {
        width: 20px;
        height: 20px;
        color: ${({ theme }) => theme.colors.primary};
      }
      .row-bar {
        height: 8px;
        background: ${({ theme }) => theme.colors.secondary};
        border-radius: 2px;
        overflow: hidden;
        span {
          display: block;
          height: 100%;
          background-color: ${({ theme }) => theme.colors.primary};
          ${stripes}
          background-size: 10px 10px;
          transition: width 0.5s ease-out;
        }
      }
      .digits {
        font-size: 20px;
        text-align: right;
      }
    }
    .zones {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      .zone-chip {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        color: ${({ theme }) => theme.colors.dark};
        .zone {
          width: 22px;
          height: 22px;
          color: ${({ theme }) => theme.colors.primary};
        }
        .digits {
          font-size: 20px;
        }
        &.empty {
          opacity: 0.4;
          .zone {
            color: #8d8c95;
          }
        }
      }
    }
    .detail-note {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.primary_inverse};
    }
    .steps-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 6px;
      margin-top: 14px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .digits {
        font-size: 22px;
        line-height: 1;
        color: ${({ theme }) => theme.colors.dark};
      }
      small {
        font-size: 11px;
        color: #55545f;
      }
    }
  }

  /* Icono CSS de cada título de sección */
  .title-icon {
    display: inline-block;
    width: 26px;
    height: 26px;
    margin-right: 8px;
    vertical-align: -3px;
    background: ${({ theme }) => theme.colors.primary};
    -webkit-mask: var(--icon) center / contain no-repeat;
    mask: var(--icon) center / contain no-repeat;
  }
  .ti-week {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M5 4h14a2.5 2.5 0 0 1 2.5 2.5v13A2.5 2.5 0 0 1 19 22H5a2.5 2.5 0 0 1-2.5-2.5v-13A2.5 2.5 0 0 1 5 4zm-.5 6v9.5c0 .3.2.5.5.5h14c.3 0 .5-.2.5-.5V10z'/%3E%3Crect x='6.5' y='1.5' width='2.4' height='5' rx='1.2'/%3E%3Crect x='15.1' y='1.5' width='2.4' height='5' rx='1.2'/%3E%3Crect x='5.5' y='13' width='13' height='3.4' rx='1'/%3E%3C/svg%3E");
  }
  .ti-month {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M5 4h14a2.5 2.5 0 0 1 2.5 2.5v13A2.5 2.5 0 0 1 19 22H5a2.5 2.5 0 0 1-2.5-2.5v-13A2.5 2.5 0 0 1 5 4zm-.5 6v9.5c0 .3.2.5.5.5h14c.3 0 .5-.2.5-.5V10z'/%3E%3Crect x='6.5' y='1.5' width='2.4' height='5' rx='1.2'/%3E%3Crect x='15.1' y='1.5' width='2.4' height='5' rx='1.2'/%3E%3Crect x='5.6' y='11.8' width='2.6' height='2.4' rx='.5'/%3E%3Crect x='9.3' y='11.8' width='2.6' height='2.4' rx='.5'/%3E%3Crect x='13' y='11.8' width='2.6' height='2.4' rx='.5'/%3E%3Crect x='16.7' y='11.8' width='2.6' height='2.4' rx='.5'/%3E%3Crect x='5.6' y='15.8' width='2.6' height='2.4' rx='.5'/%3E%3Crect x='9.3' y='15.8' width='2.6' height='2.4' rx='.5'/%3E%3Crect x='13' y='15.8' width='2.6' height='2.4' rx='.5'/%3E%3Crect x='16.7' y='15.8' width='2.6' height='2.4' rx='.5'/%3E%3C/svg%3E");
  }
  .ti-gift {
    --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 9.5c0-.8.7-1.5 1.5-1.5h6.3v4H3z'/%3E%3Cpath d='M13.2 8h6.3c.8 0 1.5.7 1.5 1.5V12h-7.8z'/%3E%3Cpath d='M4.2 13.3h6.6V22H6.2c-1.1 0-2-.9-2-2z'/%3E%3Cpath d='M13.2 13.3h6.6V20c0 1.1-.9 2-2 2h-4.6z'/%3E%3Cpath fill='none' stroke='black' stroke-width='2' stroke-linecap='round' d='M12 7.6C10.6 5 7.4 3.4 6.6 5.2 5.9 6.8 9 7.6 12 7.6zm0 0c1.4-2.6 4.6-4.2 5.4-2.4.7 1.6-2.4 2.4-5.4 2.4z'/%3E%3C/svg%3E");
    background: ${({ theme }) => theme.colors.primary_inverse};
  }

  /* Resumen del mes */
  .summary {
    .summary-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      h3 {
        font-size: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .digits {
        font-size: 40px;
        color: ${({ theme }) => theme.colors.dark};
        text-shadow: 2px 2px 0px ${({ theme }) => theme.colors.secondary};
      }
    }
    .summary-bar {
      display: flex;
      height: 16px;
      margin: 6px 0 12px;
      background: ${({ theme }) => theme.colors.secondary};
      ${hardBorder}
      overflow: hidden;
      span {
        transition: flex 0.4s;
      }
      .complete {
        background-color: ${({ theme }) => theme.colors.primary};
        ${stripes}
      }
      .partial {
        background: ${PARTIAL};
      }
      .missed {
        background: ${({ theme }) => theme.colors.primary_inverse};
      }
    }
    .summary-note {
      margin-top: 8px;
      text-align: center;
      font-size: 13px;
      color: #55545f;
    }
  }

  /* Recuento compacto bajo la barra: muestra de color + número */
  .stats {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: -6px;
    div {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 24px;
    }
    .sw {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    .complete .sw {
      background-color: ${({ theme }) => theme.colors.primary};
      ${stripes}
      background-size: 8px 8px;
    }
    .partial .sw {
      background: ${PARTIAL};
      box-shadow: inset 0 0 0 1px ${PARTIAL_BORDER};
    }
    .missed .sw {
      background: ${({ theme }) => theme.colors.primary_inverse};
    }
    .digits {
      font-size: 24px;
      line-height: 1;
      color: ${({ theme }) => theme.colors.dark};
    }
  }
`;
