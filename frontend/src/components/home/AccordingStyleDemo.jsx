const AccordingStyleDemo = () => {
  return (
    <div className="container_section_sm  rounded-lg">
      <section className="accordian_container mb-6 relative text-white bg-dark-blue2 rounded-lg ">
        <input
          className="ac_input absolute top-0 left-0 hidden opacity-0"
          id="ac-1"
          name="ac-1"
          type="checkbox"
        />
        <label htmlFor="ac-1" className="block p-4 font-bold cursor-pointer">
          CCD Management
        </label>
        <article className="ac_text px-4 opacity-0 h-0 w-full overflow-hidden">
          <p className="pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            temporibus odio quis consectetur corporis nobis incidunt distinctio
            suscipit ea. Rerum enim consectetur perferendis doloribus optio
            sequi quibusdam, ipsum eius asperiores. What is Lorem Ipsum? Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </article>
      </section>
    </div>
  );
};

export default AccordingStyleDemo;
